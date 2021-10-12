import { ApiProperty } from '@nestjs/swagger';
export class CreatePizzaDto {
  @ApiProperty()
  name: string;
  @ApiProperty({
    format: 'binary',
  })
  image: string; //TODO pofixit string?/?????///?/
  @ApiProperty()
  weight: number;
  @ApiProperty()
  price: number;
  @ApiProperty({
    example: '[1,2,3,4,5,6]',
    description: 'array of numbers in string',
    isArray: true,
  })
  ingredients: string;
}
