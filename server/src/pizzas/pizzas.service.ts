import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { Pizza } from './pizza.model';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { PizzaNotFound } from 'src/customErrors/database';
import { Cache } from 'cache-manager';

@Injectable()
export class PizzasService {
  constructor(
    @InjectModel(Pizza) private pizzaRepository: typeof Pizza,
    private ingredientsService: IngredientsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private readonly attributes = ['name', 'id', 'price', 'weight', 'image'];
  private readonly included = {
    model: Ingredient,
    attributes: ['id'],
    through: { attributes: [] },
  };

  private async getCachedPizzas() {
    return await this.cacheManager.get('pizzas');
  }

  private async setCachedPizzas() {
    await this.cacheManager.del('pizzas');
    const pizzas = await this.pizzaRepository.findAll({
      attributes: this.attributes,
      include: this.included,
    });
    await this.cacheManager.set('pizzas', pizzas, { ttl: 3600 });
    return pizzas;
  }
  // TODO refactor?
  async getAll() {
    const cache = await this.getCachedPizzas();
    if (!cache) {
      return await this.setCachedPizzas();
    }
    return cache;
  }

  async findByIdWithoutInclude(id: number) {
    const pizza = await this.pizzaRepository.findByPk(id, {
      attributes: this.attributes,
    });
    if (!pizza) {
      throw new PizzaNotFound();
    }
    return pizza;
  }

  async findById(id: number) {
    const pizza = await this.pizzaRepository.findByPk(id, {
      attributes: this.attributes,
      include: this.included,
    });
    if (!pizza) {
      throw new PizzaNotFound();
    }
    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto, img: Express.Multer.File) {
    if (!Array.isArray(createPizzaDto.ingredients)) {
      throw new Error();
      //TODO fix this
    }
    createPizzaDto.image = img.filename;
    const Pizza = await this.pizzaRepository.create(createPizzaDto);
    const findedIngredients = await this.ingredientsService.findMany(
      createPizzaDto.ingredients,
    );
    this.setCachedPizzas();
    await Pizza.$set('ingredients', findedIngredients);
    return { Pizza, ingredients: findedIngredients };
  }

  async deleteInstance(instance: Pizza) {
    await instance.destroy();
    this.setCachedPizzas();
  }

  async updateInstance(instance: Pizza, updatePizzaDto: UpdatePizzaDto) {
    const updated = await instance.update(updatePizzaDto);
    this.setCachedPizzas();
    return updated;
  }

  async updateIngredients(
    instance: Pizza,
    updateIngredientsDto: UpdateIngredientsDto,
  ) {
    const findedIngredients = await this.ingredientsService.findMany(
      updateIngredientsDto.ingredients,
    );
    await instance.$set('ingredients', findedIngredients);
    this.setCachedPizzas();
    return findedIngredients;
  }

  async updateImage(instance: Pizza, image: Express.Multer.File) {
    const updatedPizza = await instance.update({ image: image.filename });
    this.setCachedPizzas();
    return { src: updatedPizza.image };
  }
}
