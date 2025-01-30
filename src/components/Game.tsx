// components/Game.tsx

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket: any;

const Game = () => {
  const [gameState, setGameState] = useState<any>(null);
  const [move, setMove] = useState<any>(null);

  useEffect(() => {
    socket = io();

    socket.on('connect', () => {
      console.log('connected to game server');
    });

    socket.on('move', (data: any) => {
      setGameState(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMove = () => {
    const moveData = { /* move data structure */ };
    socket.emit('move', moveData);
  };

  return (
    <div>
      <h1>Game Board</h1>
      <button onClick={handleMove}>Make Move</button>
      <div>Game State: {JSON.stringify(gameState)}</div>
    </div>
  );
};

export default Game;
