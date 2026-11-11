import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      
      // Let Socket.IO handle /api/socketio directly; do not forward to Next.js
      if (parsedUrl.pathname && parsedUrl.pathname.startsWith('/api/socketio')) {
        return;
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  const io = new Server(httpServer, {
    path: '/api/socketio',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Attach to global for Next.js API route broadcasting
  global.__io = io;

  io.on('connection', (socket) => {
    // console.log(`[Socket.IO] Client connected: ${socket.id}`);

    socket.on('join_resource', (resourceId) => {
      socket.join(`resource_${resourceId}`);
    });

    socket.on('leave_resource', (resourceId) => {
      socket.leave(`resource_${resourceId}`);
    });

    socket.on('disconnect', () => {
      // console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Socket.IO server running on path /api/socketio`);
  });
});
