import { Injectable } from '@nestjs/common';
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
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
  async me(user: any) { 
    return user;
  }

  async getAllUsers() {
    return this._usersService.getAllUsers();
  }
 
}
