import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';
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

  async create(model: UserModel): Promise<UserModel> {
    let salt=await bcrypt.genSalt(10);
    let entity={
        email:model.email,
        password:await bcrypt.hash(model.password,salt),
        passwordSalt:salt,
    }as UserEntity

    return this._userRepository.save(entity);
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return this._userRepository.find();
  }

}
