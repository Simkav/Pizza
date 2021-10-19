import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsPhoneNumber('UA')
  @ApiProperty({
    description: 'Phone number can be in format like +38096 or 96 etc...',
    example: '+380960000009',
  })
  readonly phone: string;
  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'Password', example: '111111' })
  readonly password: string;
}
