import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  providers: [OrganizationService],
  controllers:[OrganizationController],
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  exports: [OrganizationService]
})
export class OrganizationModule {}