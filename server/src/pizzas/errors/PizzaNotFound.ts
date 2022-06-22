import { HttpException } from '@nestjs/common';

export class PizzaNotFound extends HttpException {
  constructor() {
    super('Pizza not found', 404);
  }
}
