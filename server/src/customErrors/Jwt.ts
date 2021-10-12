import { UnauthorizedException, HttpException } from '@nestjs/common';

export class JwtExpiredException extends HttpException {
  constructor() {
    super('Jwt Expired', 419);
  }
}

export class JwtInvalidException extends UnauthorizedException {
  constructor() {
    super('Jwt invalid');
  }
}

export class NotABearerException extends UnauthorizedException {
  constructor() {
    super('Header authorization must be a Bearer');
  }
}

export class JwtEmptyException extends UnauthorizedException {
  constructor() {
    super("Jwt token don't provided");
  }
}
