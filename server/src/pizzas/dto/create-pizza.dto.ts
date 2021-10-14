import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CreatePizzaDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty({
    type: 'file',
    description: 'Any image type, with 20mb threshold',
  })
  image: any;
  @IsNumber()
  @ApiProperty()
  weight: number;
  @IsNumber()
  @ApiProperty()
  price: number;
  @IsString()
  @ApiProperty({
    example: '[1,2,3,4,5,6]',
    description: 'array of numbers in string',
    isArray: true,
  })
  ingredients: string;
}
