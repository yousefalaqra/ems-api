import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationEntity } from '../entities/registration.entity';
import { RegistrationModel } from '../models/registration.model';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(RegistrationEntity)
    private _registrationRepository: Repository<RegistrationEntity>,
    private mailerService: MailerService,
  ) {}

  async sendEmail(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      from: '',
      subject: 'Registration Confirmation for The Fragrance Foundation’s DEI',
      template: 'registration-email',
      context: {
        firstName: name,
      },
    });
  }

  async create(model: RegistrationModel) {
    let entity = {
      firstName: model.firstName,
      lastName: model.lastName,
      capacity: model.capacity,
      email: model.email,
      company: model.company,
      country: model.country,
      isReceiveCommunication: model.isReceiveCommunication,
      questions: model.questions,
      title: model.title,
    } as RegistrationEntity;

    let createdEntity = this._registrationRepository.create(entity);
    await this._registrationRepository.save(createdEntity);
    await this.sendEmail(model.email, model.firstName);

    return createdEntity;
  }
}
