import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
      private _usersService: UsersService,
      private _jwtService: JwtService
      ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this._usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    let status = await this._usersService.getUserStatus(user.username);
    if (status.message == 1) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this._jwtService.sign(payload),
      };
    }
    //return { status: false, message: 'User not verified, please verify your email' };
    throw new HttpException('User not verified, please verify your email', HttpStatus.BAD_REQUEST);
  }

  async getAllUsers() {
    return this._usersService.getAllUsers();
  }
 
}
