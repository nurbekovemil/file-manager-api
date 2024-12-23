import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Folder } from './entities/folder.entity';
import { FilesGateway } from './files.gateway';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([File, Folder]), JwtModule, UsersModule],
  providers: [FilesService, FilesGateway],
  controllers: [FilesController],
})
export class FilesModule {}
