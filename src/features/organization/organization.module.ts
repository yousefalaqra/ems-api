import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationService } from './organization.service';

@Module({
  providers: [OrganizationService],
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  exports: [OrganizationService]
})
export class OrganizationModule {}