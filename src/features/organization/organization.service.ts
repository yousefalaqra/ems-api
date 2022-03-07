import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(OrganizationEntity)
        private _organizationRepository: Repository<OrganizationEntity>,
    ){}
    
    async findAll(): Promise<OrganizationEntity[]> {
        return this._organizationRepository.find();
    }
    
    async findOne(id: number): Promise<OrganizationEntity | undefined> {
        return this._organizationRepository.findOne(id);
    }

    async create(organization: OrganizationEntity): Promise<OrganizationEntity> {
        return this._organizationRepository.save(organization);
    }
    

}
