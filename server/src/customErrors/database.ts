import { HttpException } from '@nestjs/common';

export class IngredientNotFound extends HttpException {
  constructor() {
    super('Ingredient not found', 404);
  }
}

export class PizzaNotFound extends HttpException {
  constructor() {
    super('Pizza not found', 404);
  }
}
