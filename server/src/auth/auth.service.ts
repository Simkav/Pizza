import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvalidPassword } from 'src/customErrors/credentials';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/users.model';
import { UserService } from 'src/users/users.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userSerive: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const findedUser = await this.userSerive.findByPhone(userDto.phone);
    const isPasswordCorrect = await findedUser.checkPassword(userDto.password);
    if (!isPasswordCorrect) {
      throw new InvalidPassword();
    }
    const tokens = await this.generateTokens(findedUser);
    return tokens;
  }

  async register(userDto: CreateUserDto) {
    const newUser = await this.userSerive.createUser(userDto);
    return await this.generateTokens(newUser);
  }

  async refresh(tokenDto: RefreshTokenDto) {
    const data = await this.jwtService.verifyAsync(tokenDto.token, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    const user = await this.userSerive.findById(data.id);
    const tokens = await this.generateTokens(user);
    return tokens;
  }

  private async generateTokens(user: User) {
    const accesToken = await this.jwtService.signAsync(
      { id: user.id, isAdmin: user.isAdmin },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id, isAdmin: user.isAdmin },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      },
    );
    return { accesToken, refreshToken };
  }
}
