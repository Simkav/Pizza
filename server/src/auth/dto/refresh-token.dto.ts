import { ApiProperty } from '@nestjs/swagger';
export class RefreshTokenDto {
  @ApiProperty()
  readonly token: string;
}
