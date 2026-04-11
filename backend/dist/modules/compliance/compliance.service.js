"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceService = void 0;
const database_1 = require("../../config/database");
const logger_1 = require("../../config/logger");
const library_1 = require("@prisma/client/runtime/library");
class ComplianceService {
    static async generateSAR(input) {
        // Fetch transactions for the report
        const transactions = await database_1.prisma.transaction.findMany({
            where: { id: { in: input.transactionIds }, tenantId: input.tenantId },
        });
        if (transactions.length === 0) {
            throw new Error('No valid transactions found');
        }
        const totalAmount = transactions.reduce((sum, tx) => sum.plus(tx.amount), new library_1.Decimal(0));
        const currencies = [...new Set(transactions.map(tx => tx.currency))];
        const dateRange = {
            from: new Date(Math.min(...transactions.map(tx => tx.createdAt.getTime()))).toISOString(),
            to: new Date(Math.max(...transactions.map(tx => tx.createdAt.getTime()))).toISOString(),
        };
        const riskIndicators = [];
        if (transactions.some(tx => tx.anomalyFlag))
            riskIndicators.push('Anomaly detected by ML model');
        if (transactions.some(tx => tx.graphFlag))
            riskIndicators.push('Network graph anomaly (shared identifiers)');
        if (transactions.some(tx => tx.riskScore >= 80))
            riskIndicators.push('Critical risk score detected');
        if (totalAmount.greaterThanOrEqualTo(100000))
            riskIndicators.push(`High cumulative amount: $${totalAmount.toLocaleString()}`);
        const content = {
            subjectName: transactions[0].senderName || 'Unknown',
            subjectAccount: 'See transaction details',
            suspiciousActivity: input.suspiciousActivity,
            activityDateRange: dateRange,
            totalAmount,
            currency: currencies.join(', '),
            narrativeDescription: input.narrativeDescription,
            riskIndicators,
            supportingTransactions: input.transactionIds,
        };
        const report = await database_1.prisma.complianceReport.create({
            data: {
                type: 'SAR',
                status: 'DRAFT',
                transactionIds: input.transactionIds,
                generatedBy: input.generatedBy,
                tenantId: input.tenantId,
                content: content,
            },
        });
        logger_1.logger.info(`SAR generated: ${report.id} for ${transactions.length} transactions`);
        return report;
    }
    static async generateSTR(input) {
        const transactions = await database_1.prisma.transaction.findMany({
            where: { id: { in: input.transactionIds }, tenantId: input.tenantId },
        });
        if (transactions.length === 0) {
            throw new Error('No valid transactions found');
        }
        const content = {
            reportingEntity: input.tenantId,
            suspectName: transactions[0].senderName || 'Unknown',
            transactionDetails: transactions.map(tx => ({
                transactionId: tx.id,
                amount: tx.amount,
                date: tx.createdAt.toISOString(),
                riskScore: tx.riskScore,
            })),
            reasonForSuspicion: input.reasonForSuspicion,
            regulatoryBody: input.regulatoryBody,
        };
        const report = await database_1.prisma.complianceReport.create({
            data: {
                type: 'STR',
                status: 'DRAFT',
                transactionIds: input.transactionIds,
                generatedBy: input.generatedBy,
                tenantId: input.tenantId,
                content: content,
            },
        });
        logger_1.logger.info(`STR generated: ${report.id}`);
        return report;
    }
    static async listReports(params) {
        const where = { tenantId: params.tenantId };
        if (params.type)
            where.type = params.type;
        if (params.status)
            where.status = params.status;
        const [reports, total] = await Promise.all([
            database_1.prisma.complianceReport.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (params.page - 1) * params.limit,
                take: params.limit,
            }),
            database_1.prisma.complianceReport.count({ where }),
        ]);
        return { reports, total, page: params.page, totalPages: Math.ceil(total / params.limit) };
    }
    static async getReport(id, tenantId) {
        return database_1.prisma.complianceReport.findFirst({ where: { id, tenantId } });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async submitReport(reportId, _submittedBy) {
        return database_1.prisma.complianceReport.update({
            where: { id: reportId },
            data: { status: 'SUBMITTED', filingDate: new Date() },
        });
    }
    static async exportReport(id, tenantId, format) {
        const report = await database_1.prisma.complianceReport.findFirst({ where: { id, tenantId } });
        if (!report)
            throw new Error('Report not found');
        if (format === 'csv') {
            // Convert to CSV format
            const content = report.content;
            if (content && typeof content === 'object' && 'transactionDetails' in content && Array.isArray(content.transactionDetails)) {
                const headers = 'Transaction ID,Amount,Date,Risk Score\n';
                const rows = content.transactionDetails
                    .map((tx) => {
                    const t = tx;
                    return `${t.transactionId},${t.amount},${t.date},${t.riskScore}`;
                })
                    .join('\n');
                return headers + rows;
            }
        }
        return report;
    }
}
exports.ComplianceService = ComplianceService;
