import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { prisma } from "../../config/database";
import { logger } from "../../config/logger";

// POST /api/risk/train  (ADMIN only)
export const triggerRetrain = async (req: Request, res: Response) => {
  // optional: accept body params to customize training (e.g., contamination)
  const trainScript = path.resolve(process.cwd(), "../ml/train_supervised.py");
  
  // Check if script exists (path adjustment for monorepo structure)
  // Docker: /app/ml/train_supervised.py if volumes mounted correctly?
  // Local: backend is in ./backend, ml is in ./ml. So ../ml/train_supervised.py
  
  if (!fs.existsSync(trainScript)) {
     // Try absolute path or different relative path
     const altPath = path.resolve(process.cwd(), "ml", "train_supervised.py");
     if (!fs.existsSync(altPath)) {
        logger.error(`Training script not found at ${trainScript} or ${altPath}`);
        return res.status(500).json({ success: false, error: "Training script not found" });
     }
  }

  logger.info(`Starting training using ${trainScript}`);

  exec(`python ${trainScript}`, { cwd: path.resolve(process.cwd(), ".."), env: process.env }, async (err, stdout, stderr) => {
    if (err) {
      logger.error("Training failed: " + err.message);
      logger.error(stderr);
    } else {
      logger.info("Training finished");
      logger.info(stdout);
    }
    // After training completes (success or fail), attempt to read model_meta.json
    try {
      const metaPath = path.resolve(process.cwd(), "../fraud-ml-service", "models", "model_meta.json");
      if (fs.existsSync(metaPath)) {
        const metaRaw = fs.readFileSync(metaPath, "utf-8");
        const meta = JSON.parse(metaRaw);
        const version = meta.model_version || `v${Date.now()}`;
        await prisma.modelVersion.create({
          data: {
            id: version, // Using version string as ID if unique, or rename to name
            name: version,
            metrics: meta as any,
          }
        });
        logger.info("Saved model metadata to DB", version);
      } else {
        logger.warn("model_meta.json not found after training");
      }
    } catch (dbErr) {
      logger.error("Failed to write model meta to DB: " + dbErr);
    }
  });

  // stream training stdout back? For simplicity respond immediately with accepted.
  res.status(202).json({ success: true, data: { message: "Training started (async). Check logs for progress." } });
};
