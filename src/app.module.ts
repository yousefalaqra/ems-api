import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';  
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './features/events/events.module';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/user.module';
import { RoleModule } from './features/roles/role.module';
import { TeamModule } from './features/teams/team.module';
import { OrganizationModule } from './features/organization/organization.module';
import { IndustryModule } from './features/industry/industry.module';
import {ConfigModule} from '@nestjs/config'
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },

      },
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    RoleModule,
    TeamModule,
    OrganizationModule,
    IndustryModule,
    PublicModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
