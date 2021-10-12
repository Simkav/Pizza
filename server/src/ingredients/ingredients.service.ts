import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IngredientNotFound } from 'src/customErrors/database';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './ingredients.model';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient) private ingredientRepository: typeof Ingredient,
  ) {}

  async getAll() {
    return await this.ingredientRepository.findAll({
      attributes: ['id', 'name'],
    });
  }
  async findById(id: number) {
    const ingredient = await this.ingredientRepository.findByPk(id, {
      attributes: ['id', 'name'],
    });
    if (!ingredient) {
      throw new IngredientNotFound();
    }
    return ingredient;
  }
  async create(createIngredientDto: CreateIngredientDto) {
    const ingredient = await this.ingredientRepository.create(
      createIngredientDto,
    );
    return { id: ingredient.id, name: ingredient.name };
  }
  async destroyInstance(instance: Ingredient) {
    return await instance.destroy();
  }
  async findMany(id: number[]) {
    return await this.ingredientRepository.findAll({
      where: { id },
      attributes: ['id', 'name'],
    });
  }
  async update(instance: Ingredient, createIngredientDto: CreateIngredientDto) {
    return await instance.update(createIngredientDto);
  }
}
