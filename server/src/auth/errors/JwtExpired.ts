import { HttpException } from '@nestjs/common';

export class JwtExpiredException extends HttpException {
  constructor() {
    super('Jwt Expired', 419);
  }
}
