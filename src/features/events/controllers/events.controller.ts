import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/features/auth/jwt-auth.guard';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { EntryEntity } from '../entities/entry.entity';
import { EventEntity } from '../entities/event.entity';
import { EventModel } from '../models/event.model';
import { EventsService } from '../services/events.service';
import { diskStorage } from 'multer';
import { VirtualEventModel } from '../models/virtual-event.model';

import { editFileName } from '../upload-img';
@Controller('/api/v1/events')
export class EventsController {
  constructor(private _eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Array<EventEntity>> {    
    return this._eventsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<EventEntity> {
    return this._eventsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('entries/:id')
  getEntries(@Param('id') id: number): Promise<Array<EntryEntity>> {
    return this._eventsService.getEventEntries(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('export/:id')
  async exportEntries(@Param('id') id: number): Promise<any> {
    return this._eventsService.exportEventEntries(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() model: EventModel): Promise<EventEntity> {
    return this._eventsService.create(model);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() model: EventModel,
  ): Promise<UpdateResult> {
    return this._eventsService.update(id, model);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage/imgs',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this._eventsService.updateEventImage(id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this._eventsService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('virtual/:id')
  upsertVirtual(
    @Param('id') id: number,
    @Body() model: VirtualEventModel
  ) {
    return this._eventsService.upsertVirtual(id, model);
  }

  @UseGuards(JwtAuthGuard)
  @Get('virtual/:id')
  showVirtualEvent(
    @Param('id') id: number
  ) {
    return this._eventsService.showVirtualEvent(id);
  }
 
}
