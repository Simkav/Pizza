import { ApiProperty } from '@nestjs/swagger';

export class UpdatePizzaDto {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  weight?: number;
  @ApiProperty({ required: false })
  price?: number;
}
// TODO refactor
