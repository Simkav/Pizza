import { UnauthorizedException } from '@nestjs/common';

export class JwtInvalidException extends UnauthorizedException {
  constructor() {
    super('Jwt invalid');
  }
}
