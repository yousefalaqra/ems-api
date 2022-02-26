import { Module } from '@nestjs/common';
import { EventsModule } from 'src/features/events/events.module';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

@Module({
  providers: [PublicService],
  controllers: [PublicController],
  imports: [EventsModule]
})
export class PublicModule {}
