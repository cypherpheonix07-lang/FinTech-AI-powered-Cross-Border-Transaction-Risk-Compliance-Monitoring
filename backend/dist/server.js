"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const socket_io_1 = require("socket.io");
const server = http_1.default.createServer(app_1.default);
// WebSocket setup
const io = new socket_io_1.Server(server, {
    cors: {
        origin: env_1.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
io.on('connection', (socket) => {
    logger_1.logger.info(`🔌 Socket connected: ${socket.id}`);
    socket.on('disconnect', () => {
        logger_1.logger.info(`🔌 Socket disconnected: ${socket.id}`);
    });
});
// Start Server
const PORT = env_1.env.PORT || 5000;
server.listen(PORT, () => {
    logger_1.logger.info(`🚀 Server running on http://localhost:${PORT} in ${env_1.env.NODE_ENV} mode`);
});
