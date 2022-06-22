import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { PizzasService } from 'src/pizzas/pizzas.service';

@Injectable()
export class ParsePizzaId implements NestMiddleware {
  constructor(private pizzaService: PizzasService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      req.pizzaInstance = await this.pizzaService.findByIdWithoutInclude(
        Number(req.params.id),
      );
      next();
    } catch (error) {
      next(error);
    }
  }
}
