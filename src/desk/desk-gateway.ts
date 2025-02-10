import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
// import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ cors: true })
export class DeskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  // constructor(private readonly authService: AuthService) {}
  handleConnection(socket: Socket) {
    console.log('connected', socket.id);
  }
  handleDisconnect(client: Socket) {
    console.log('disconnected', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    try {
      this.server
        .to(room)
        .emit('message', `${client.id} has joined the room ${room}`);
    } catch (error) {
      console.error('Error emitting message:', error);
    }
  }
}
