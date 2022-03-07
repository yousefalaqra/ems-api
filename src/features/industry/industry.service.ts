import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndustryEntity } from './entities/industry.entity';

@Injectable()
export class IndustryService {
    constructor(
        @InjectRepository(IndustryEntity)
        private _industryRepository: Repository<IndustryEntity>,
    ){}
    
    async findAll(): Promise<IndustryEntity[]> {
        return this._industryRepository.find();
    }

    async findOne(id: number): Promise<IndustryEntity | undefined> {
        return this._industryRepository.findOne(id);
    }

    async create(industry: IndustryEntity): Promise<IndustryEntity> {
        return this._industryRepository.save(industry);
    }
    
}
