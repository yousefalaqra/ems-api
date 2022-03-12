import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import * as uuid from "uuid";

@Injectable()
export class UsersService {
  constructor(

    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private readonly _mailerService: MailerService,
  ) {}

  async findOne(username: string): Promise<UserEntity> {
    try{
      return await this._userRepository.findOneOrFail({where:{username:username}});
    }catch(error){
      throw new Error('User not found');
    }
  }

  async create(model: UserModel): Promise<any> {
    let exist=await this._userRepository.findOne({where:{email:model.email}});
    if(exist) return { status:false, message:"Email already exist" };
    let code=uuid.v4();
    let salt=await bcrypt.genSalt(10);
    let entity={
        email:model.email,
        password:await bcrypt.hash(model.password,salt),
        passwordSalt:salt,
        confirmationCode:code,
    }as UserEntity
    this.sendMail(model.email,code);
    this._userRepository.save(entity)
    return {
        status:true,
        message:"User created successfully, please check your email to verify your account",
    };
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
      console.log('Error sending email: ', err);
    })
  }

  async confirmEmail(code:string):Promise<any>{
    let user=await this._userRepository.findOne({where:{confirmationCode:code}});
    if(!user) throw new Error("User not found");
    user.status=1;
    user.confirmationCode=null;
    this._userRepository.save(user);
    return {status:true,message:"User verified successfully"};
  }

  async getUserStatus(username:string):Promise<any>{
    let user=await this._userRepository.findOne({where:{username:username}});
    if(!user) throw new Error("User not found");
    return {message: user.status };
  }
}


