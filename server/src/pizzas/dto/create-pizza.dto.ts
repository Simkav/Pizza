import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CreatePizzaDto {
  @IsString()
  @ApiProperty({ description: 'Name of created pizza', example: 'Pizza Yolo' })
  name: string;
  @ApiProperty({
    type: 'file',
    description: 'Any image type, with 20mb threshold',
  })
  image: any;
  @IsNumber()
  @ApiProperty({ description: 'Weight of created pizza', example: 300 })
  weight: number;
  @IsNumber()
  @ApiProperty({ description: 'Price of created pizza', example: 300 })
  price: number;
  @IsString()
  @ApiProperty({
    example: '[1,2,3,4,5,6]',
    description: 'array of numbers in string',
    isArray: true,
  })
  ingredients: string;
}
