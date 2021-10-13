import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  // @ApiProperty({
  //   example: 'AbobusBatkovich@gmail.com',
  //   description: 'Valid email'
  // })
  @ApiProperty()
  readonly phone: string;
  // @ApiProperty({ example: 'Abobus228', description: 'Valid password' })
  @ApiProperty()
  readonly password: string;
}
