import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredients.model';
import { Pizza } from 'src/pizzas/pizza.model';
import { PizzaIngredients } from 'src/pizzas/pizza-ingredients.model';

@Module({
  imports: [SequelizeModule.forFeature([Pizza, Ingredient, PizzaIngredients])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
