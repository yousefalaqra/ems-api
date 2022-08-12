import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindConditions,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { EntryEntity } from '../entities/entry.entity';
import { EventEntity } from '../entities/event.entity';
import { EntryModel } from '../models/entry.model';
import { EventModel } from '../models/event.model';
import { parseAsync } from 'json2csv';

import * as fs from 'fs';
import { promisify } from 'util';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private _eventRepository: Repository<EventEntity>,
    @InjectRepository(EntryEntity)
    private _entryRepository: Repository<EntryEntity>,
  ) {}

  async create(model: EventModel): Promise<EventEntity> {
    let entity = {
      title: model.title,
      description: model.description,
      startTime: model.startTime,
      endTime: model.endTime,
      video: model.video,
      isMain: model.isMain,
      isPublished: model.isPublished,
      img: model.img,
    } as EventEntity;

    console.log('objectL: ', entity);

    let createdEntity = this._eventRepository.create(entity);

    await this._eventRepository.save(createdEntity);

    return createdEntity;
  }

  async update(id: number, model: EventModel): Promise<UpdateResult> {
    let entity = {
      description: model.description,
      endTime: model.endTime,
      isMain: model.isMain,
      isPublished: model.isPublished,
      video: model.video,
      startTime: model.startTime,
      title: model.title,
    } as EventEntity;

    return this._eventRepository.update(
      { id: id } as FindConditions<EventEntity>,
      entity,
    );
  }

  async updateEventImage(
    id: number,
    file: Express.Multer.File,
  ): Promise<UpdateResult> {
    let imgPath = `${process.env.HOST}/${file.path}`;

    console.log('img:', imgPath);
    let entity = {
      img: imgPath,
    } as EventEntity;

    return this._eventRepository.update({ id: id }, entity);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this._eventRepository.delete({ id: id });
  }

  getFeaturedEvent(): Promise<EventEntity> {
    return this._eventRepository.findOne({ where: { isMain: true } });
  }



  findAll() {
    return this._eventRepository.find();
  }

  findOne(id: number): Promise<EventEntity> {
    return this._eventRepository.findOne({ where: { id: id } });
  }

  getEventEntries(id: number): Promise<Array<EntryEntity>> {
    return this._entryRepository.find({ where: { event: { id: id } } });
  }

  async exportEventEntries(id: number): Promise<any> {
    let url = '';
    let entries = await this._entryRepository.find({
      where: { event: { id: id } },
    });

    const fields = [
      'id',
      'firstName',
      'lastName',
      'email',
      'title',
      'company',
      'country',
      'capacity',
      'street',
      'apt',
      'state',
      'city',
      'zipCode',
      'isSubscribed',
      'registrationDate',
    ];
    const opts = { fields };

    let csv = await parseAsync(entries, opts);

    let d = new Date();

    const filePath = `storage/app/exports/entries`;
    const fileName = `${d.getFullYear()}_${d.getMonth()}_${d.getDate()}__${d.getHours()}_${d.getMinutes()}-entries.csv`;

    await this.createFile(filePath, fileName, csv);

    // return await this.getFile(fileName, '');

    return { uri: `${filePath}/${fileName}` };
  }

  async createFile(
    path: string,
    fileName: string,
    data: string,
  ): Promise<void> {
    if (!this.checkIfFileOrDirectoryExists(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    const writeFile = promisify(fs.writeFile);

    return await writeFile(`${path}/${fileName}`, data, 'utf8');
  }

  checkIfFileOrDirectoryExists(path: string): boolean {
    return fs.existsSync(path);
  }

  async getFile(fileName: string, encoding: string): Promise<string | Buffer> {
    const readFile = promisify(fs.readFile);

    const filePath = `storage/app/exports/entries/${fileName}`;

    return readFile(filePath, 'utf8');
  }
}
