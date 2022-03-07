import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this._userRepository.findOne({ where: { username: username } });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this._userRepository.save(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this._userRepository.find();
  }

}
