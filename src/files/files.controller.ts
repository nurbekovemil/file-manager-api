import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  async getAllFiles(@GetUser() user: User) {
    return this.filesService.getFiles(user);
  }

  @Post('folder')
  async createFolder(
    @Body('name') name: string,
    @Body('path') path: string,
    @GetUser() user: User,
  ) {
    return this.filesService.createFolder(name, path, user);
  }

  @Post('file')
  async createFile(
    @Body('name') name: string,
    @Body('path') path: string,
    @Body('type') type: string,
    @Body('size') size: number,
    @GetUser() user: User,
  ) {
    return this.filesService.createFile(name, path, type, size, user);
  }
}
