import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlzQWRtaW4iOnRydWUsInBob25lIjoiKzM4MDk2MDAwMDAwOSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjM0MjM5MjUyLCJleHAiOjE2MzY4MzEyNTJ9.lq6FIO37c5H4-NP3WM7dMP0Qv4jV9BmfdC1uoeIuqsE',
  })
  @IsString()
  readonly token: string;
}
