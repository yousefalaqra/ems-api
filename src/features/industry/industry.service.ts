import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndustryEntity } from './entities/industry.entity';
import { IndustryModel } from './models/industry.model';

@Injectable()
export class IndustryService {
    constructor(
        @InjectRepository(IndustryEntity)
        private _industryRepository: Repository<IndustryEntity>,
    ){}
    
    async findAll(): Promise<IndustryEntity[]> {
        return await this._industryRepository.find();
    }

    async findOne(id: number): Promise<IndustryEntity> {
        let industry = await this._industryRepository.findOneOrFail(id);
        if (!industry) throw new NotFoundException(`Industry with id ${id} not found`);
        return industry;
    }

    async create(model: IndustryModel): Promise<IndustryModel> {
        let entity={
            name:model.name,
        }as IndustryEntity
        return await this._industryRepository.save(entity);
    }
    
}
