import { CreatePizzaDto } from './create-pizza.dto';
import { PartialType, OmitType } from '@nestjs/swagger';

export class UpdatePizzaDto extends PartialType(
  OmitType(CreatePizzaDto, ['image', 'ingredients'] as const),
) {}
