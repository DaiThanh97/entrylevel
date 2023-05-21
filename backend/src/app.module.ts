import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_CONFIG, validate } from './configs/env';
import { SessionModule } from './modules/session/session.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ENV_CONFIG],
      isGlobal: true,
      cache: true,
      validate,
    }),
    WinstonModule.forRoot({
      level: 'debug',
      defaultMeta: { service: 'application', env: process.env.NODE_ENV },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    SessionModule,
  ],
})
export class AppModule {}
