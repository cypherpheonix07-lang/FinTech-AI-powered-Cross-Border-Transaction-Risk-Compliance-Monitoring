"use strict";
/**
 * PATHGUARD PILLAR 5: INSTITUTIONAL TREASURY
 * Governance Service — Role-Based Access Control (RBAC) policy engine.
 * Ensures only authorized entities can perform sensitive treasury actions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.governanceService = exports.GovernanceService = exports.InstitutionalRole = void 0;
var InstitutionalRole;
(function (InstitutionalRole) {
    InstitutionalRole["ADMIN"] = "ADMIN";
    InstitutionalRole["TREASURY_MANAGER"] = "TREASURY_MANAGER";
    InstitutionalRole["COMPLIANCE_OFFICER"] = "COMPLIANCE_OFFICER";
    InstitutionalRole["AUDITOR"] = "AUDITOR";
    InstitutionalRole["VIEWER"] = "VIEWER";
})(InstitutionalRole || (exports.InstitutionalRole = InstitutionalRole = {}));
class GovernanceService {
    static instance;
    userRoles = new Map();
    constructor() {
        this.seedDeveloperRoles();
    }
    static getInstance() {
        if (!GovernanceService.instance) {
            GovernanceService.instance = new GovernanceService();
        }
        return GovernanceService.instance;
    }
    seedDeveloperRoles() {
        this.assignRole('Founder_Alpha', InstitutionalRole.ADMIN, 'PG_HQ_001');
        this.assignRole('Compliance_Bot', InstitutionalRole.COMPLIANCE_OFFICER, 'PG_HQ_001');
    }
    /**
     * Assign a role to a user within an institution.
     */
    assignRole(userId, role, institutionId) {
        this.userRoles.set(userId, {
            userId,
            role,
            institutionId,
            grantedAt: new Date().toISOString()
        });
        console.log(`[Pillar-5] RBAC: ${role} assigned to user ${userId} for institution ${institutionId}`);
    }
    /**
     * Check if a user has permission for a specific action.
     */
    canPerformAction(userId, action) {
        const record = this.userRoles.get(userId);
        if (!record)
            return false;
        const { role } = record;
        switch (action) {
            case 'INITIATE_TRANSFER':
                return [InstitutionalRole.ADMIN, InstitutionalRole.TREASURY_MANAGER].includes(role);
            case 'APPROVE_TRANSFER':
                return [InstitutionalRole.ADMIN, InstitutionalRole.COMPLIANCE_OFFICER].includes(role);
            case 'VIEW_SENSITIVE_LOGS':
                return [InstitutionalRole.ADMIN, InstitutionalRole.AUDITOR].includes(role);
            case 'MANAGE_USERS':
                return role === InstitutionalRole.ADMIN;
            default:
                return role === InstitutionalRole.ADMIN || role === InstitutionalRole.VIEWER;
        }
    }
    /**
     * Get the role of a user.
     */
    getUserRole(userId) {
        return this.userRoles.get(userId)?.role;
    }
}
exports.GovernanceService = GovernanceService;
exports.governanceService = GovernanceService.getInstance();
