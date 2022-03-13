import { Injectable, NotFoundException } from '@nestjs/common';
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
        let user= await this._teamRepository.findOneOrFail(id);
        if(!user) throw new NotFoundException(`Team with id ${id} not found`);
        return user;
    }
       
    async create(team: TeamEntity): Promise<TeamEntity> {
        return await this._teamRepository.save(team);
    }


}
