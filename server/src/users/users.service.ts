import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userRepository.create(createUserDto);
    return createdUser;
  }

  async findById(id: number) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async findByPhone(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });
    return user;
  }
}
