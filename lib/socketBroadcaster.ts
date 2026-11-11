// Broadcast helper for Socket.IO events

export function broadcastSocketEvent(event: string, payload: any) {
  try {
    if (typeof global !== 'undefined' && (global as any).__io) {
      (global as any).__io.emit(event, payload);
    }
  } catch (err) {
    console.warn('Socket broadcast warning:', err);
  }
}
