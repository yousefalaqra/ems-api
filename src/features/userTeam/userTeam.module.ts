import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamEntity } from './entities/userTeam.entity';
import { UserTeamService } from './userTeam.service';

@Module({
  providers: [UserTeamService],
  imports: [TypeOrmModule.forFeature([UserTeamEntity])],
  exports: [UserTeamService]
})
export class UserTeamModule {}