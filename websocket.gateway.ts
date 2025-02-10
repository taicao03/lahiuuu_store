import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: any) {
    console.log('Client connected');
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }
}
