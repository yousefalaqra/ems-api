import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleModel } from './models/role.model';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private _roleRepository: Repository<RoleEntity>,
    ) { }
    async findAll(): Promise<RoleEntity[]> {
        return await this._roleRepository.find();
    }
    async findOne(id: number): Promise<RoleEntity> {
        try {
            return await this._roleRepository.findOneOrFail(id);
        } catch (error) {
            throw new Error('Role not found');
        }
    }
    async create(model: RoleModel): Promise<RoleModel> {
        let entity = {
            name: model.name,
        } as RoleEntity
        return await this._roleRepository.save(entity);
    }
    async update(id: number, role: RoleEntity): Promise<RoleEntity> {
        role.id = id;
        return await this._roleRepository.save(role);
    }
    async delete(id: number): Promise<void> {
        await this._roleRepository.delete(id);
    }

  
}
