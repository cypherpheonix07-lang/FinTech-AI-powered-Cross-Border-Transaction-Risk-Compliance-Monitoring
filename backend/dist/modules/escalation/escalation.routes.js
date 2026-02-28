"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/modules/escalation/escalation.routes.ts
const express_1 = require("express");
const escalation_controller_1 = require("./escalation.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/', escalation_controller_1.EscalationController.list);
router.get('/stats', escalation_controller_1.EscalationController.getStats);
router.get('/:id', escalation_controller_1.EscalationController.getById);
router.post('/:id/resolve', escalation_controller_1.EscalationController.resolve);
router.post('/:id/assign', escalation_controller_1.EscalationController.assign);
exports.default = router;
