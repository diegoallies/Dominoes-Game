// pages/api/game.ts

import { Server } from 'socket.io';

let io: Server;

export const startSocketServer = (server: any) => {
  io = new Server(server, {
    path: '/api/game',
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Handle player moves and other game actions here
    socket.on('move', (data) => {
      console.log('Player move:', data);
      // Emit move to all connected clients
      io.emit('move', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    res.status(200).send('WebSocket server ready');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
