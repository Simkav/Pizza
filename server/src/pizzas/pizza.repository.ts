import { Injectable } from '@nestjs/common';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { Pizza } from './pizza.model';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { PizzaNotFound } from './errors/PizzaNotFound';

@Injectable()
export class PizzasRepository {
  constructor(@InjectModel(Pizza) private pizzaModel: typeof Pizza) {}

  private readonly attributes = ['name', 'id', 'price', 'weight', 'image'];
  private readonly included = {
    model: Ingredient,
    attributes: ['id'],
    through: { attributes: [] },
  };

  async getAll() {
    return await this.pizzaModel.findAll({
      attributes: this.attributes,
      include: this.included,
    });
  }

  async findByIdWithoutInclude(id: number) {
    const pizza = await this.pizzaModel.findByPk(id, {
      attributes: this.attributes,
    });
    if (!pizza) {
      throw new PizzaNotFound();
    }
    return pizza;
  }

  async findById(id: number) {
    const pizza = await this.pizzaModel.findByPk(id, {
      attributes: this.attributes,
      include: this.included,
    });
    if (!pizza) {
      throw new PizzaNotFound();
    }
    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto) {
    return await this.pizzaModel.create(createPizzaDto);
  }

  async deleteInstance(instance: Pizza) {
    await instance.destroy();
  }

  async updateInstance(instance: Pizza, updatePizzaDto: UpdatePizzaDto) {
    return await instance.update(updatePizzaDto);
  }

  async updateIngredients(instance: Pizza, ingredients: Ingredient[]) {
    await instance.$set('ingredients', ingredients);
  }

  async updateImage(instance: Pizza, image: string) {
    return (await instance.update({ image })).image;
  }
}
