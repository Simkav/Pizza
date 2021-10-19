import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty({ description: 'Name of created ingredient', example: 'Tomato' })
  @IsString()
  name: string;
}
