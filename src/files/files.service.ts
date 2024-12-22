import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { User } from 'src/users/entities/user.entity';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
  ) {}

  // Получение всех файлов пользователя
  async getFiles(user: User): Promise<File[]> {
    return this.fileRepository.find({ where: { user: user } });
  }

  // Получение всех папок пользователя
  async getFolders(user: User): Promise<Folder[]> {
    return this.folderRepository.find({ where: { user: user } });
  }

  // Создание новой папки
  async createFolder(name: string, path: string, user: User): Promise<Folder> {
    const folder = this.folderRepository.create({ name, path, user });
    return this.folderRepository.save(folder);
  }

  // Создание нового файла
  async createFile(
    name: string,
    path: string,
    type: string,
    size: number,
    user: User,
  ): Promise<File> {
    const file = this.fileRepository.create({ name, path, type, size, user });
    return this.fileRepository.save(file);
  }
}
