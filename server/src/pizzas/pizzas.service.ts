import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { Pizza } from './pizza.model';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import { Cache } from 'cache-manager';
import { PizzasRepository } from './pizza.repository';

@Injectable()
export class PizzasService {
  constructor(
    private pizzaRepository: PizzasRepository,
    private ingredientsService: IngredientsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async getCachedPizzas() {
    return await this.cacheManager.get('pizzas');
  }

  private async deleteCachePizzas() {
    await this.cacheManager.del('pizzas');
  }

  private async setCachedPizzas() {
    const pizzas = await this.pizzaRepository.getAll();
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
    return await this.pizzaRepository.findByIdWithoutInclude(id);
  }

  async findById(id: number) {
    return await this.pizzaRepository.findById(id);
  }

  async create(createPizzaDto: CreatePizzaDto, img: Express.Multer.File) {
    if (!Array.isArray(createPizzaDto.ingredients)) {
      throw new Error();
      //TODO fix this
    }
    createPizzaDto.image = img.filename;
    const instance = await this.pizzaRepository.create(createPizzaDto);
    const findedIngredients = await this.ingredientsService.findMany(
      createPizzaDto.ingredients,
    );
    await this.pizzaRepository.updateIngredients(instance, findedIngredients);
    this.deleteCachePizzas();
    return { Pizza: instance, ingredients: findedIngredients };
  }

  async deleteInstance(instance: Pizza) {
    await instance.destroy();
    this.deleteCachePizzas();
  }

  async updateInstance(instance: Pizza, updatePizzaDto: UpdatePizzaDto) {
    const updated = await instance.update(updatePizzaDto);
    this.deleteCachePizzas();
    return updated;
  }

  async updateIngredients(
    instance: Pizza,
    updateIngredientsDto: UpdateIngredientsDto,
  ) {
    const findedIngredients = await this.ingredientsService.findMany(
      updateIngredientsDto.ingredients,
    );
    await this.pizzaRepository.updateIngredients(instance, findedIngredients);
    this.deleteCachePizzas();
    return findedIngredients;
  }

  async updateImage(instance: Pizza, image: Express.Multer.File) {
    const updatedImagePath = await this.pizzaRepository.updateImage(
      instance,
      image.filename,
    );
    this.deleteCachePizzas();
    return { src: updatedImagePath };
  }
}
