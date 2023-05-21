import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SESSION_ERROR } from './session.error';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SessionDto } from './session.dto';
import { HttpStatusCode } from 'axios';

@Injectable()
export class SessionService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getSessions(
    short_title?: string,
    status?: string,
  ): Promise<SessionDto[]> {
    try {
      this.logger.debug(
        `getSessions - start with params {short_title: ${short_title}, status: ${status}}`,
      );
      const externalUrl = this.configService.get<string>('EXTERNAL_URL') ?? '';
      const response = await this.httpService.axiosRef.get(externalUrl);

      if (response.status !== HttpStatusCode.Ok) {
        this.logger.error(`Something went wrong with external service`);
        throw new InternalServerErrorException(
          SESSION_ERROR.FETCH_SESSION_FAILED,
        );
      }

      let sessions = response.data as SessionDto[];
      if (short_title) {
        sessions = sessions.filter((session) =>
          session.program.some((prg) => prg.short_title === short_title),
        );
      }

      if (status) {
        sessions = sessions.filter((session) => session.status === status);
      }

      sessions = sessions.sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.end_date).getTime(),
      );

      return sessions;
    } catch (err) {
      this.logger.error(
        `Something went wrong with external service: `,
        JSON.stringify(err),
      );
      throw new InternalServerErrorException(err);
    }
  }
}
