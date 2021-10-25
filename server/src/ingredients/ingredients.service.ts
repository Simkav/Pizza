import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientNotFound } from './errors/IngredientNotFound';
import { Ingredient } from './ingredients.model';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient) private ingredientRepository: typeof Ingredient,
  ) {}

  private readonly attributes = ['id', 'name'];

  async getAll() {
    return await this.ingredientRepository.findAll({
      attributes: this.attributes,
    });
  }
  async findById(id: number) {
    const ingredient = await this.ingredientRepository.findByPk(id, {
      attributes: this.attributes,
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
      attributes: this.attributes,
    });
  }
  async update(instance: Ingredient, createIngredientDto: CreateIngredientDto) {
    return await instance.update(createIngredientDto);
  }
}
