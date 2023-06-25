import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway(80)
export class MyGateway implements OnModuleInit {
  connectedUsersCount = 0;

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected: ', socket.id);
      this.connectedUsersCount++;
      this.sendConnectedUsersCount();
    });

    this.server.on('disconnect', (socket) => {
      console.log('Disconnected: ', socket.id);
      this.connectedUsersCount--;
      this.sendConnectedUsersCount();
    });
  }

  sendConnectedUsersCount() {
    this.server.emit('connectedUsersCount', this.connectedUsersCount);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(
    @MessageBody()
    body: any,
  ) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
