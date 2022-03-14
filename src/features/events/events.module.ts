import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controllers/events.controller';
import { EntryEntity } from './entities/entry.entity';
import { EventEntity } from './entities/event.entity';
import { VirtualEventEntity } from './entities/virtual-event.entity';
import { EventsService } from './services/events.service';

@Module({
  providers: [EventsService],
  controllers: [EventsController],
  imports: [
    TypeOrmModule.forFeature([EventEntity, EntryEntity, VirtualEventEntity], ),
    MulterModule.register({
      dest: './storage/imgs',
    })
  ],
  exports: [TypeOrmModule],
})
export class EventsModule {}
