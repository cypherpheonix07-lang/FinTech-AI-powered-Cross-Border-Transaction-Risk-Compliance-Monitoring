"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingestion_controller_1 = require("./ingestion.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/swift', auth_middleware_1.authMiddleware, ingestion_controller_1.IngestionController.ingestSWIFT);
router.post('/iso20022', auth_middleware_1.authMiddleware, ingestion_controller_1.IngestionController.ingestISO20022);
exports.default = router;
