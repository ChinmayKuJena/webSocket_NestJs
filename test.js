const { io } = require('socket.io-client'); // Use require for CommonJS

// Connect to the WebSocket server
const socket = io('ws://localhost:3000');
// const socket = io('http://localhost:3000');

// When connected
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

// Log incoming messages
socket.on('sms:send', (payload) => {
  console.log('[SMS Sent] Received payload:', payload);
});

socket.on('sms:acknowledge', (payload) => {
  console.log('[Acknowledgment] Received payload:', payload);
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});
