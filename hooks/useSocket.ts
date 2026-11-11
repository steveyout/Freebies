'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export function getSocket(): Socket {
  if (!socketInstance && typeof window !== 'undefined') {
    // Warm up the socket endpoint in case running under next dev
    fetch('/api/socketio').catch(() => {});

    socketInstance = io({
      path: '/api/socketio',
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
  }
  return socketInstance!;
}

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = getSocket();
    socketRef.current = socket;

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    if (socket.connected) {
      setIsConnected(true);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
  };
}

export function useResourceRealtime(resourceId?: string) {
  const { socket, isConnected } = useSocket();
  const [liveVotes, setLiveVotes] = useState<{
    score?: number;
    upvotesCount?: number;
    downvotesCount?: number;
  }>({});
  const [latestComments, setLatestComments] = useState<any[]>([]);

  useEffect(() => {
    if (!socket || !resourceId) return;

    socket.emit('join_resource', resourceId);

    const handleVote = (payload: any) => {
      if (payload.resourceId === resourceId) {
        setLiveVotes({
          score: payload.score,
          upvotesCount: payload.upvotesCount,
          downvotesCount: payload.downvotesCount,
        });
      }
    };

    const handleComment = (newComment: any) => {
      if (newComment.resourceId === resourceId) {
        setLatestComments(prev => [newComment, ...prev]);
      }
    };

    socket.on('vote_updated', handleVote);
    socket.on('new_comment', handleComment);

    return () => {
      socket.emit('leave_resource', resourceId);
      socket.off('vote_updated', handleVote);
      socket.off('new_comment', handleComment);
    };
  }, [socket, resourceId]);

  return {
    isConnected,
    liveVotes,
    latestComments,
  };
}
