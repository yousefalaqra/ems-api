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
        return await this._teamRepository.find();
    }

    async findOne(id: number): Promise<TeamEntity> {
        try{
            return await this._teamRepository.findOneOrFail(id);
        }catch(error){
            throw new Error('Team not found');
        }
    }

    async create(team: TeamEntity): Promise<TeamEntity> {
        return await this._teamRepository.save(team);
    }


}
