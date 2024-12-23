import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { User } from 'src/users/entities/user.entity';
import { File } from './entities/file.entity';
import { CreateFileDto, CreateFolderDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
  ) {}

  // Получение всех файлов пользователя
  async getFiles(user: User): Promise<File[]> {
    try {
      const files = await this.findFilesByUser(user);
      if (!files || files.length === 0) {
        throw new NotFoundException('Files not found for the user');
      }
      return files;
    } catch (error) {
      throw new BadRequestException('Error fetching files: ' + error.message);
    }
  }

  // Получение всех папок пользователя
  async getFolders(user: User): Promise<Folder[]> {
    try {
      const folders = await this.findFoldersByUser(user);
      if (!folders || folders.length === 0) {
        throw new NotFoundException('Folders not found for the user');
      }
      return folders;
    } catch (error) {
      throw new BadRequestException('Error fetching folders: ' + error.message);
    }
  }

  // Создание новой папки
  async createFolder(createFolderDto: CreateFolderDto, user: User) {
    try {
      const { name, path } = createFolderDto;
      if (!name || !path) {
        throw new BadRequestException('Folder name and path are required');
      }
      const folder = this.folderRepository.create({ ...createFolderDto, user });
      this.folderRepository.save(folder);
      return { message: 'Folder created successfully' };
    } catch (error) {
      throw new BadRequestException('Error creating folder: ' + error.message);
    }
  }

  // Создание нового файла
  async createFile(createFileDto: CreateFileDto, user: User) {
    try {
      const { name, path, type, size } = createFileDto;
      if (!name || !path || !type || size <= 0) {
        throw new BadRequestException('Invalid file data');
      }
      const file = this.fileRepository.create({ ...createFileDto, user });
      this.fileRepository.save(file);
      return { message: 'File created successfully' };
    } catch (error) {
      throw new BadRequestException('Error creating file: ' + error.message);
    }
  }

  private async findFilesByUser(user: User) {
    return this.fileRepository.find({ where: { user: user } });
  }

  private async findFoldersByUser(user: User) {
    return this.folderRepository.find({ where: { user: user } });
  }
}
