import { Body,Post,Controller,Param,Get } from "@nestjs/common";
import {UsersService} from "./user.service";
import {UserModel} from "./models/user.model";
import { SETTINGS } from "./user.utilis";

@Controller('/api/v1/user')

export class UsersController{
    constructor(
        private _userService:UsersService,
    ){}

  @Post('')
  async create(@Body(SETTINGS.VALIDATION_PIPE) model: UserModel) {
    return this._userService.create(model)
  }

  @Get('/confirm/:code')
  async confirmEmail(@Param('code') code: string) {
    return this._userService.confirmEmail(code);
  }

}