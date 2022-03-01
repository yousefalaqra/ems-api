import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntryEntity } from 'src/features/events/entities/entry.entity';
import { EventEntity } from 'src/features/events/entities/event.entity';
import { EntryModel } from 'src/features/events/models/entry.model';
import { InsertResult, Repository } from 'typeorm';

import { compile } from 'handlebars';
import * as fs from 'fs';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);


@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(EventEntity)
    private _eventRepository: Repository<EventEntity>,
    @InjectRepository(EntryEntity)
    private _entryRepository: Repository<EntryEntity>,
    private readonly _mailerService: MailerService,
  ) {}

  getFeaturedEvent(): Promise<EventEntity> {
    return this._eventRepository.findOne({ where: { isMain: true } });
  }

  findOne(id: number): Promise<EventEntity> {
    return this._eventRepository.findOne({ where: { id: id } });
  }

  async register(id: number, model: EntryModel): Promise<InsertResult> {
    let entity = {
      apt: model.apt,
      capacity: model.capacity,
      city: model.city,
      company: model.company,
      country: model.country,
      email: model.email,
      event: { id: id } as EventEntity,
      firstName: model.firstName,
      isSubscribed: model.isSubscribed,
      lastName: model.lastName,
      registrationDate: new Date(Date.now()),
      state: model.state,
      street: model.street,
      title: model.title,
      zipCode: model.zipCode,
    } as EntryEntity;

    console.log('test: ', entity);
    let newEntry = await this._entryRepository.insert(entity);

    let confirmationHTMLToSend = await this.buildHtmlTemplate(`email-templates/confirmation-email.html`, entity);

    let result = await this._mailerService.sendMail({
      to: entity.email,
      from: 'The Fragrance Foundation',
      subject:
        'Registration Confirmation for The Fragrance Foundation’s Fragrance Day 2022 Virtual Event',
      html: confirmationHTMLToSend,
    });

    let notificationHTMLToSend = await this.buildHtmlTemplate('email-templates/notification-email.html', entity);


    let notification = await this._mailerService.sendMail({
      to: 'info@fragranceday.org',
      from: 'info@fragranceday.org',
      subject:
        'Registration Notification for The Fragrance Foundation’s Fragrance Day 2022 Virtual Event',
      html: notificationHTMLToSend,
    });

    console.log(result);

    return newEntry;
  }

  private async buildHtmlTemplate(path: string, data: any): Promise<string> {
    let html = await readFile(path, 'utf8');
    let template = compile(html);
    let htmlToSend = template(data);

    return htmlToSend;
  }
}
