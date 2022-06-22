import { PipeTransform, Injectable } from '@nestjs/common';
import { CreatePizzaDto } from 'src/pizzas/dto/create-pizza.dto';

@Injectable()
export class CreatePizzaPipe implements PipeTransform<CreatePizzaDto> {
  async transform(value: CreatePizzaDto) {
    if (Array.isArray(value.ingredients)) {
      throw new Error(); // TODO fix this
    }
    return {
      name: value.name,
      price: Number(value.price),
      weight: Number(value.weight),
      ingredients: value.ingredients.split(',').map(Number).filter(Boolean),
    };
  }
}
