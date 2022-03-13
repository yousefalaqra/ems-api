import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationModel } from './models/organization.model';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(OrganizationEntity)
        private _organizationRepository: Repository<OrganizationEntity>,
    ){}
    
    async findAll(): Promise<OrganizationEntity[]> {
        return await this._organizationRepository.find();
    }
    
    async findOne(id: number): Promise<OrganizationEntity> {
        let organization = await this._organizationRepository.findOneOrFail(id);
        if (!organization) throw new NotFoundException(`Organization with id ${id} not found`);
        return organization;
    }

    async create(model: OrganizationModel): Promise<OrganizationModel> {
        let entity={
            name:model.name,
            numberOfEmeployees:model.numberOfEmeployees,
        }as OrganizationEntity
        return await this._organizationRepository.save(entity);
    }
    

}
