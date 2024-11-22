import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
})
export class SmsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SmsGateway.name);

  // Handle client connection
  handleConnection(client: Socket) {
    const clientKey = client.handshake.query.key;

    if (!clientKey) {
      this.logger.warn(`Client connection rejected: Missing key`);
      client.disconnect();
      return;
    }

    this.logger.log(`Client connected: ${client.id}, Key: ${clientKey}`);

    client.join(clientKey);
    this.logger.log(`Client ${client.id} joined room: ${clientKey}`);

  }

  // handle client disconnection
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // emit a message to a specific room (key)
  sendMessageToKey(key: string, message: any) {
    this.server.to(key).emit('custom:message', message);
    this.logger.log(`Message sent to key ${key}: ${JSON.stringify(message)}`);
  }
}
