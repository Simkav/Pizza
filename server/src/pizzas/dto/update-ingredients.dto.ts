import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
export class UpdateIngredientsDto {
  @IsArray()
  @ApiProperty({
    type: Number,
    isArray: true,
    example: '[1, 2, 3, 4, 5]',
    description: "Array with id's of updated pizza",
  })
  ingredients: number[];
}
