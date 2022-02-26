import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private _appService: AppService) {}



}
