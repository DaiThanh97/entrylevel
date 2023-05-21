import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SessionService } from './session.service';
import { SessionDto, SessionQueryInput } from './session.dto';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @ApiOperation({
    description: 'Get list sessions',
  })
  @ApiOkResponse({ description: 'Success', type: SessionDto })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getSessions(@Query() input: SessionQueryInput): Promise<SessionDto[]> {
    const { short_title, status } = input;
    return this.sessionService.getSessions(short_title, status);
  }
}
