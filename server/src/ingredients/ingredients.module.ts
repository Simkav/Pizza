import { SequelizeModule } from '@nestjs/sequelize';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredients.model';
import { Pizza } from 'src/pizzas/pizza.model';
import { PizzaIngredients } from 'src/pizzas/pizza-ingredients.model';
import { ParseIngredientId } from 'src/middlewares/parse-ingredient-id.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Pizza, Ingredient, PizzaIngredients])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParseIngredientId)
      .exclude('ingredients')
      .forRoutes(IngredientsController);
  }
}
