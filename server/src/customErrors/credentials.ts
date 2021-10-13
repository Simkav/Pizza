import { UnauthorizedException } from '@nestjs/common';

export class InvalidPassword extends UnauthorizedException {
  constructor() {
    super('Invalid password');
  }
}

export class NotAnAdmin extends UnauthorizedException {
  constructor() {
    super('Not an admin');
  }
}
