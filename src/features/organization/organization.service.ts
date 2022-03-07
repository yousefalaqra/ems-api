import { Injectable } from '@nestjs/common';
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
        return this._organizationRepository.find();
    }
    
    async findOne(id: number): Promise<OrganizationEntity | undefined> {
        return this._organizationRepository.findOne(id);
    }

    async create(model: OrganizationModel): Promise<OrganizationModel> {
        let entity={
            name:model.name
        }as OrganizationEntity

        // let entity2:OrganizationEntity={
        //     name:model.name
        // }
        
        return this._organizationRepository.save(entity);
    }
    

}
