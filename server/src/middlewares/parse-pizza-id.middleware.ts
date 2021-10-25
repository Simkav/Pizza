import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestWithUserPizza } from '../types/requests';
import { PizzasService } from 'src/pizzas/pizzas.service';

@Injectable()
export class ParsePizzaId implements NestMiddleware {
  constructor(private pizzaService: PizzasService) {}
  async use(req: RequestWithUserPizza, res: Response, next: NextFunction) {
    try {
      const pizzaInstance = await this.pizzaService.findByIdWithoutInclude(
        Number(req.params.id),
      );
      req.pizzaInstance = pizzaInstance;
      next();
    } catch (error) {
      next(error);
    }
  }
}
