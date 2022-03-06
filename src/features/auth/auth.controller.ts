import { Controller, Request,Response, Post, UseGuards, Get } from '@nestjs/common';

import { get } from 'http';
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

  @Post('register')
  async register(@Request() req) {
    return this._authService.register(req.body);
  }

  @Get('users')
  async getAllUsers() {
    return await this._authService.getAllUsers();
  }

}
