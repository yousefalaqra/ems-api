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
    ){}

    async create(model: RegistrationModel) {
        
    let entity={
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
    this._registrationRepository.save(createdEntity);

    return createdEntity;
    }

}