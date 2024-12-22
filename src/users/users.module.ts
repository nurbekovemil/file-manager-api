import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Регистрация сущности
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Экспортируем сервис для других модулей
})
export class UsersModule {}
