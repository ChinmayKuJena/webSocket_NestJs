// import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @WebSocketGateway({ cors: true })
// export class SmsGateway {
//   @WebSocketServer()
//   server: Server;

//   broadcastEvent(event: string, payload: any) {
//     this.server.emit(event, payload);
//   }
// }

import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SmsGateway {
  private readonly logger = new Logger(SmsGateway.name); // Instantiate the logger

  @WebSocketServer()
  server: Server;

  // Method to broadcast events
  broadcastEvent(event: string, payload: any) {
    this.logger.log(`Broadcasting event: ${event} with payload: ${JSON.stringify(payload)}`);
    this.server.emit(event, payload);
    this.logger.log(`Event ${event} broadcasted successfully`);
  }
  
  // Example: Method to handle client connections (optional)
  onConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  // Example: Method to handle client disconnections (optional)
  onDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
