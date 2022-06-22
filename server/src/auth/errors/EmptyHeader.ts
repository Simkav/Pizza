import { UnauthorizedException } from '@nestjs/common';

export class EmptyHeaderAuthorization extends UnauthorizedException {
  constructor() {
    super('Empty header authorization');
  }
}
