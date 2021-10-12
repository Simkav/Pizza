import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { PizzaIngredients } from './pizza-ingredients.model';
import { Pizza } from './pizza.model';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'public', 'pizzas'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

@Module({
  imports: [
    SequelizeModule.forFeature([Pizza, Ingredient, PizzaIngredients]),
    IngredientsModule,
    MulterModule.register({ storage: storage }),
  ],

  controllers: [PizzasController],
  providers: [PizzasService],
})
export class PizzasModule {}
