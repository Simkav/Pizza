import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { ParsePizzaId } from 'src/middlewares/parse-pizza-id.middleware';
import { fileFilter, limits, storage } from './multer-config';
import { PizzaIngredients } from './pizza-ingredients.model';
import { Pizza } from './pizza.model';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Pizza, Ingredient, PizzaIngredients]),
    IngredientsModule,
    CacheModule.register({}),
    MulterModule.register({
      storage,
      fileFilter,
      limits,
    }), //20mb limit
  ],

  controllers: [PizzasController],
  providers: [PizzasService],
})
export class PizzasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParsePizzaId)
      .exclude('pizzas', { path: 'pizzas/(.*)', method: RequestMethod.GET })
      .forRoutes(PizzasController);
  }
}
