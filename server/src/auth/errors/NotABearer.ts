import { UnauthorizedException } from '@nestjs/common';

export class NotABearerException extends UnauthorizedException {
  constructor() {
    super('Header authorization must be a Bearer');
  }
}
