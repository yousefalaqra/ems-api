import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/auth/v1/')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this._authService.login(req.body);
  }

  @Post('createUser')
  async createUser(@Request() req) {
    return this._authService.createUser(req.body);
  }


  @Get('users')
  async getAllUsers() {
    return await this._authService.getAllUsers();
  }

}
