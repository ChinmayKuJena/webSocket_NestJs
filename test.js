const { io } = require('socket.io-client'); // Use require for CommonJS

// Connect to the WebSocket server with the key 'user123'
const socket = io('ws://localhost:3000', {
  query: { key: 'user123' }  // The key will be sent during the connection
});

// When connected to the WebSocket server
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

// Log incoming messages for 'sms:send' event
socket.on('sms:send', (payload) => {
  console.log('[SMS Sent] Received payload:', payload);
});

// Log incoming messages for 'sms:acknowledge' event
socket.on('sms:acknowledge', (payload) => {
  console.log('[Acknowledgment] Received payload:', payload);
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

// Log when disconnected
socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});
