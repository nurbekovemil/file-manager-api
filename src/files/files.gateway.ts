import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, MessageBody, WsResponse, ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateFileDto, CreateFolderDto } from './dto/create-file.dto';
import { FilesService } from './files.service';
import { User } from 'src/users/entities/user.entity';

@WebSocketGateway(3001, {
  cors: true
})
export class FilesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('FilesGateway');

  constructor(
    private readonly filesService: FilesService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async handleConnection(@ConnectedSocket() socket: Socket) {
    const token = socket.handshake.query.token;
    if (!token) {
      this.logger.error('No token provided');
      socket.disconnect();
      return;
    }
    try {
      // Верификация токена
      const decoded = this.jwtService.verify(token.toString(), { secret: process.env.JWT_SECRET });
      const user: User = await this.userService.findUserByUsername(decoded.username);
      if (!user) {
        this.logger.error('User not found');
        socket.disconnect();
      } else {
        socket.data.user = user;  // Добавляем пользователя в данные сокета
        this.logger.log(`User connected: ${user.username}`);
      }
    } catch (error) {
      this.logger.error('Token verification failed');
      socket.disconnect();
    }
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = socket.data.user;
    if (user) {
      this.logger.log(`User disconnected: ${user.username}`);
    }
  }

  @SubscribeMessage('createFile')
  async createFile(@MessageBody() createFileDto: CreateFileDto, @ConnectedSocket() socket: Socket): Promise<WsResponse<any>> {
    const user = socket.data.user; // Получаем пользователя из данных сокета
    const result = await this.filesService.createFile(createFileDto, user);
    return { event: 'fileCreated', data: result };
  }

  @SubscribeMessage('createFolder')
  async createFolder(@MessageBody() createFolderDto: CreateFolderDto, @ConnectedSocket() socket: Socket): Promise<WsResponse<any>> {
    const user = socket.data.user; // Получаем пользователя из данных сокета
    const result = await this.filesService.createFolder(createFolderDto, user);
    return { event: 'folderCreated', data: result };
  }
}
