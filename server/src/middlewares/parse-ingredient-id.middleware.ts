import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { IngredientsService } from 'src/ingredients/ingredients.service';

@Injectable()
export class ParseIngredientId implements NestMiddleware {
  constructor(private ingredientService: IngredientsService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      req.ingredientInstance = await this.ingredientService.findById(
        Number(req.params.id),
      );
      next();
    } catch (error) {
      next(error);
    }
  }
}
