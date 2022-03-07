import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from './entities/team.entity';


@Injectable()
export class TeamService {
    
    constructor(
        @InjectRepository(TeamEntity)
        private _teamRepository: Repository<TeamEntity>,
    ){}

    async findAll(): Promise<TeamEntity[]> {
        return this._teamRepository.find();
    }

    async findOne(id: number): Promise<TeamEntity | undefined> {
        return this._teamRepository.findOne(id);
    }

    async create(team: TeamEntity): Promise<TeamEntity> {
        return this._teamRepository.save(team);
    }


}
