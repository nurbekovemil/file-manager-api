import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateFileDto, CreateFolderDto } from './dto/create-file.dto';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  async getAllFiles(@GetUser() user: User) {
    return this.filesService.getFiles(user);
  }

  @Post('folder')
  async createFolder(@Body() createFolderDto: CreateFolderDto, @GetUser() user: User) {
    return this.filesService.createFolder(createFolderDto, user);
  }

  @Post('file')
  async createFile(@Body() createFileDto: CreateFileDto, @GetUser() user: User) {
    return this.filesService.createFile(createFileDto, user);
  }

}
