import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers:[UsersController],
  exports: [UsersService]
})
export class UsersModule {}
