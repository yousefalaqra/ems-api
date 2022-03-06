import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private _roleRepository: Repository<RoleEntity>,
    ) { }
    async findAll(): Promise<RoleEntity[]> {
        return await this._roleRepository.find();
    }
    async findOne(id: number): Promise<RoleEntity | undefined> {
        return await this._roleRepository.findOne(id);
    }
    async create(role: RoleEntity): Promise<RoleEntity> {
        return await this._roleRepository.save(role);
    }
    async update(id: number, role: RoleEntity): Promise<RoleEntity> {
        role.id = id;
        return await this._roleRepository.save(role);
    }
    async delete(id: number): Promise<void> {
        await this._roleRepository.delete(id);
    }

  
}
