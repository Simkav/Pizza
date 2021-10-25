import { UnauthorizedException } from '@nestjs/common';

export class JwtEmptyException extends UnauthorizedException {
  constructor() {
    super("Jwt token don't provided");
  }
}
