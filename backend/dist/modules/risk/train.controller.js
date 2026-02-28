"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerRetrain = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const database_js_1 = require("../../config/database.js");
const logger_js_1 = require("../../config/logger.js");
// POST /api/risk/train  (ADMIN only)
const triggerRetrain = async (req, res) => {
    // optional: accept body params to customize training (e.g., contamination)
    const trainScript = path_1.default.resolve(process.cwd(), "../ml/train_supervised.py");
    // Check if script exists (path adjustment for monorepo structure)
    // Docker: /app/ml/train_supervised.py if volumes mounted correctly?
    // Local: backend is in ./backend, ml is in ./ml. So ../ml/train_supervised.py
    if (!fs_1.default.existsSync(trainScript)) {
        // Try absolute path or different relative path
        const altPath = path_1.default.resolve(process.cwd(), "ml", "train_supervised.py");
        if (!fs_1.default.existsSync(altPath)) {
            logger_js_1.logger.error(`Training script not found at ${trainScript} or ${altPath}`);
            return res.status(500).json({ success: false, error: "Training script not found" });
        }
    }
    logger_js_1.logger.info(`Starting training using ${trainScript}`);
    (0, child_process_1.exec)(`python ${trainScript}`, { cwd: path_1.default.resolve(process.cwd(), ".."), env: process.env }, async (err, stdout, stderr) => {
        if (err) {
            logger_js_1.logger.error("Training failed: " + err.message);
            logger_js_1.logger.error(stderr);
        }
        else {
            logger_js_1.logger.info("Training finished");
            logger_js_1.logger.info(stdout);
        }
        // After training completes (success or fail), attempt to read model_meta.json
        try {
            const metaPath = path_1.default.resolve(process.cwd(), "../fraud-ml-service", "models", "model_meta.json");
            if (fs_1.default.existsSync(metaPath)) {
                const metaRaw = fs_1.default.readFileSync(metaPath, "utf-8");
                const meta = JSON.parse(metaRaw);
                const version = meta.model_version || `v${Date.now()}`;
                await database_js_1.prisma.modelVersion.create({
                    data: {
                        id: version, // Using version string as ID if unique, or rename to name
                        name: version,
                        metrics: meta,
                    }
                });
                logger_js_1.logger.info("Saved model metadata to DB", version);
            }
            else {
                logger_js_1.logger.warn("model_meta.json not found after training");
            }
        }
        catch (dbErr) {
            logger_js_1.logger.error("Failed to write model meta to DB: " + dbErr);
        }
    });
    // stream training stdout back? For simplicity respond immediately with accepted.
    res.status(202).json({ success: true, data: { message: "Training started (async). Check logs for progress." } });
};
exports.triggerRetrain = triggerRetrain;
