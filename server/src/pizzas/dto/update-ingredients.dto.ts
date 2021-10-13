import { ApiProperty } from '@nestjs/swagger';
export class UpdateIngredientsDto {
  @ApiProperty({ type: Number, isArray: true })
  ingredients: number[];
}
