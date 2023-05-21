import { HttpStatus } from '@nestjs/common';

export const SESSION_ERROR = {
  FETCH_SESSION_FAILED: {
    message: 'Something went wrong when fetching session',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};
