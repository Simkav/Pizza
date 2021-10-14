import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
export class UpdateIngredientsDto {
  @IsArray()
  @ApiProperty({ type: Number, isArray: true })
  ingredients: number[];
}
