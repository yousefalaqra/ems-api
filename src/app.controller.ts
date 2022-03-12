import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private _appService: AppService) {}

}
