import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventEntity } from 'src/features/events/entities/event.entity';
import { EntryModel } from 'src/features/events/models/entry.model';
import { InsertResult } from 'typeorm';
import { PublicService } from './public.service';

@Controller('/api/v1')
export class PublicController {
  constructor(private _publicService: PublicService) {}

  @Post(':id')
  register(
    @Param('id') id: number,
    @Body() entryModel: EntryModel,
  ): Promise<InsertResult> {
    return this._publicService.register(id, entryModel);
  }

  @Get('featured')
  getFeaturedEvent(): Promise<EventEntity> {
    return this._publicService.getFeaturedEvent();
  }

  @Get(':id')
  getEvent(@Param('id') id: number): Promise<EventEntity> {
    return this._publicService.findOne(id);
  }
}
