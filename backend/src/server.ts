import http from 'http';
import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { Server } from 'socket.io';

const server = http.createServer(app);

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  logger.info(`🔌 Socket connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// Start Server
const PORT = env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT} in ${env.NODE_ENV} mode`);
});

export { io };
