import { HttpException } from '@nestjs/common';

export class IngredientNotFound extends HttpException {
  constructor() {
    super('Ingredient not found', 404);
  }
}
