import { UnauthorizedException } from '@nestjs/common';

export class NotAnAdmin extends UnauthorizedException {
  constructor() {
    super('Not an admin');
  }
}
