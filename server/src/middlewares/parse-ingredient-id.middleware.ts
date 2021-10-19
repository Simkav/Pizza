import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestWithUserIngredient } from '../types/requests';
import { IngredientsService } from 'src/ingredients/ingredients.service';

@Injectable()
export class parseIngredientId implements NestMiddleware {
  constructor(private ingredientService: IngredientsService) {}
  async use(req: RequestWithUserIngredient, res: Response, next: NextFunction) {
    try {
      const ingredientInstance = await this.ingredientService.findById(
        Number(req.params.id),
      );
      req.ingredientInstance = ingredientInstance;
      next();
    } catch (error) {
      next(error);
    }
  }
}
