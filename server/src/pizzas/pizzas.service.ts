import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { Pizza } from './pizza.model';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { PizzaNotFound } from 'src/customErrors/database';

const pizzasPath = '/pizzas/';
const attributes = ['name', 'id', 'price', 'weight', 'image'];
@Injectable()
export class PizzasService {
  constructor(
    @InjectModel(Pizza) private pizzaRepository: typeof Pizza,
    private ingredientsService: IngredientsService,
  ) {}

  async getAll() {
    return await this.pizzaRepository.findAll({
      attributes,
      include: {
        model: Ingredient,
        attributes: ['id'],
        through: { attributes: [] },
      },
    });
  }

  private async findByIdWithoutInclude(id: number) {
    const pizza = await this.pizzaRepository.findByPk(id, {
      attributes,
    });
    if (!pizza) {
      throw new PizzaNotFound();
    }
    return pizza;
  }

  async findById(id: number) {
    const pizza = await this.pizzaRepository.findByPk(id, {
      attributes,
      include: {
        model: Ingredient,
        attributes: ['id'],
        through: { attributes: [] },
      },
    });
    if (!pizza) {
      throw new PizzaNotFound();
    }
    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto, img: Express.Multer.File) {
    console.log(createPizzaDto);
    //TODO validaiton pipe
    const newPizza = {
      name: createPizzaDto.name,
      price: +createPizzaDto.price,
      weight: +createPizzaDto.weight,
      image: pizzasPath + img.filename,
    };
    const ingredients = createPizzaDto.ingredients
      .split(',')
      .map(Number)
      .filter(Boolean); // TODO validation pipe
    const Pizza = await this.pizzaRepository.create(newPizza);
    const findedIngredients = await this.ingredientsService.findMany(
      ingredients,
    );
    await Pizza.$set('ingredients', findedIngredients);
    return { Pizza, ingredients: findedIngredients };
  }

  async delete(id: number) {
    const instance = await this.findByIdWithoutInclude(id);
    return await instance.destroy();
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto) {
    const instance = await this.findByIdWithoutInclude(id);
    return await instance.update(updatePizzaDto);
  }

  async updateIngredients(
    id: number,
    updateIngredientsDto: UpdateIngredientsDto,
  ) {
    const findedIngredients = await this.ingredientsService.findMany(
      updateIngredientsDto.ingredients,
    );
    const instance = await this.findByIdWithoutInclude(id);
    await instance.$set('ingredients', findedIngredients);
    return findedIngredients;
  }

  async updateImage(id: number, image: Express.Multer.File) {
    const instance = await this.findByIdWithoutInclude(id);
    await instance.update({ image: pizzasPath + image.filename });
    return { src: pizzasPath + image.filename };
  }
}
