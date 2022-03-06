import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from './entities/userRole.entity';
import { UserRoleServices } from './userRole.service';

@Module({
  providers: [UserRoleServices],
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  exports: [UserRoleServices]
})
export class UserRoleModule {}
