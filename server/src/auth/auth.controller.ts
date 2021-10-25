import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PhoneValidationPipe } from 'src/auth/phone-validation.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body(new ValidationPipe(), new PhoneValidationPipe())
    userDto: CreateUserDto,
  ) {
    return await this.authService.login(userDto);
  }
  @Post('register')
  async register(
    @Body(new ValidationPipe(), new PhoneValidationPipe())
    userDto: CreateUserDto,
  ) {
    return await this.authService.register(userDto);
  }
  @Post('refresh')
  async refresh(@Body(new ValidationPipe()) tokenDto: RefreshTokenDto) {
    return await this.authService.refresh(tokenDto);
  }
}
