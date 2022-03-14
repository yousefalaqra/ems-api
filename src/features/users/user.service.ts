/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import * as uuid from "uuid";
import UserStatus from './enums/user-status.enum';


@Injectable()
export class UsersService {
  
  constructor(

    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private readonly _mailerService: MailerService,
  ) {}

  async findOne(username: string): Promise<UserEntity> {
    const user= await this._userRepository.findOneOrFail({where:{username:username}});
    if(!user) throw new NotFoundException(`User ${username} not found`);
    return user;
  }

  async create(model: UserModel): Promise<any> {
    const exist=await this._userRepository.findOne({where:{email:model.email}});
    if(exist) throw new HttpException(`User with email ${model.email} already exist`,HttpStatus.BAD_REQUEST);
    const code=uuid.v4();
    const salt=await bcrypt.genSalt(10);
    const entity={
        email:model.email,
        password:await bcrypt.hash(model.password,salt),
        passwordSalt:salt,
        confirmationCode:code,
    }as UserEntity
    this.sendMail(model.email,code);
    this._userRepository.save(entity)
    throw new HttpException(`User with email ${model.email} created successfully, please check your email`,HttpStatus.CREATED);
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await this._userRepository.find();
  }

  async sendMail(email: string,code :string) {
    await this._mailerService.sendMail({
      to: email,
      from: `EMS Supporter <${process.env.EMAIL_USER}>`,
      subject: 'Email Verification',
      html: `<h1>Email Confirmation</h1>
        <p>Thank you for Sign up. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/api/v1/user/confirm/${code}> Click here</a>
        </div>`,
    }).then(() => {
      console.log('Email sent!');
    }).catch((err) => {
      console.log(err);
      
    })
  }
  

  async confirmEmail(code:string):Promise<any>{
    const user=await this._userRepository.findOne({where:{confirmationCode:code}});
    if(!user) throw new NotFoundException(`User ${code} not found`);
    user.status=UserStatus.VERIFIED;
    user.confirmationCode=null;
    this._userRepository.save(user);
    //return {status:true,message:"User verified successfully"};
    throw new HttpException(`User ${user.username} verified successfully`,HttpStatus.OK);
  }

  async getUserStatus(username:string):Promise<any>{
    const user=await this._userRepository.findOne({where:{username:username}});
    if(!user) throw new NotFoundException(`User ${username} not found`);
    return {message: user.status };
  }
}


