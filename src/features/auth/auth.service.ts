import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
      private _usersService: UsersService,
      private _jwtService: JwtService
      ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this._usersService.findOne(username);
    if (user && user.passwordHash === pass) {
      const { passwordHash, ...result } = user;
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

  async createUser(user: any) {
    return this._usersService.create(user);
  }

  async me(user: any) { 
    return user;
  }

  async getAllUsers() {
    return this._usersService.getAllUsers();
  }

  
}
