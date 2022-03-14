import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryEntity } from './entities/industry.entity';
import { IndustryService } from './industry.service';

@Module({
  providers: [IndustryService],
  imports: [TypeOrmModule.forFeature([IndustryEntity])],
  exports: [IndustryService]
})
export class IndustryModule {}