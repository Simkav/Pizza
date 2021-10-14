import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty()
  @IsString()
  name: string;
}
