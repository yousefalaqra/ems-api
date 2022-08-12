import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationController } from './controller/registration.controller';
import { RegistrationEntity } from './entities/registration.entity';
import { RegistrationService } from './services/registration.service';

@Module({
    providers: [RegistrationService],
  controllers:[RegistrationController],
  imports: [TypeOrmModule.forFeature([RegistrationEntity])],
  exports: [RegistrationService]
})
export class RegistrationModule {}
