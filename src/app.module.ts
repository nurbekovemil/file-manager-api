import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { File } from './files/entities/file.entity';
import { Folder } from './files/entities/folder.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Доступ к конфигурации из любого места
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, File, Folder], // Подключаем сущности
        synchronize: true, // Только для разработки, автосоздание таблиц
      }),
    }),
    UsersModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
