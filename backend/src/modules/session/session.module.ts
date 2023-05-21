import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  imports: [HttpModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
