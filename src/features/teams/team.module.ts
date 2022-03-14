import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';
import { TeamService } from './team.service';

@Module({
  providers: [TeamService],
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  exports: [TeamService]
})
export class TeamModule {}