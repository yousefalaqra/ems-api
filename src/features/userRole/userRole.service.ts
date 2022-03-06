import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleEntity } from './entities/userRole.entity';

@Injectable()
export class UserRoleServices {
    constructor(
        @InjectRepository(UserRoleEntity)
        private _userRoleRepository: Repository<UserRoleEntity>,
    ) { }
    async findAll(): Promise<UserRoleEntity[]> {
        return await this._userRoleRepository.find();
    }
    async findOne(id: number): Promise<UserRoleEntity | undefined> {
        return await this._userRoleRepository.findOne(id);
    }
    async create(userRole: UserRoleEntity): Promise<UserRoleEntity> {
        return await this._userRoleRepository.save(userRole);
    }
    async update(id: number, userRole: UserRoleEntity): Promise<UserRoleEntity> {
        userRole.userId = id;
        return await this._userRoleRepository.save(userRole);
    }
    async delete(id: number): Promise<void> {
        await this._userRoleRepository.delete(id);
    }
}
