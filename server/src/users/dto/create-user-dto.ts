import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsPhoneNumber('UA')
  @ApiProperty()
  readonly phone: string;
  @IsString()
  @MinLength(6)
  @ApiProperty()
  readonly password: string;
}
