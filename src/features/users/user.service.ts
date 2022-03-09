import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(

    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private _mailerService: MailerService,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this._userRepository.findOne({ where: { username: username } });
  }

  async create(model: UserModel): Promise<any> {
    let exist=await this._userRepository.findOne({where:{email:model.email}});
    if(exist) return { status:false, message:"Email already exist" };
    await this.sendMail(model.email);
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

  async sendMail(email: string) {
    await this._mailerService.sendMail({
      to: email,
      from:process.env.EMAIL_USER,
      subject: 'Hello from Nest JS ✔',
      text:'this is a test mail',
    }).then(() => {
      console.log('Email sent!');
    }).catch((err) => {
      console.log('Error sending email: ', err);
    });
  }

}


