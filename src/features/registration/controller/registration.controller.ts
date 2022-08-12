import { RegistrationService } from './../services/registration.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationModel } from '../models/registration.model';
import { RegistrationEntity } from '../entities/registration.entity';

@Controller('/api/v1/registration')
export class RegistrationController {
  constructor(
    private _registrationService: RegistrationService,
  ) {}

  @Post('')
  async create(@Body() model: RegistrationModel): Promise<RegistrationEntity> {
    return this._registrationService.create(model);
  }
}
