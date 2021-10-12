import { ApiProperty } from '@nestjs/swagger';
export class UpdateIngredientsDto {
  @ApiProperty()
  ingredients: number[];
}
