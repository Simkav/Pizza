import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class PhoneValidationPipe implements PipeTransform<CreateUserDto> {
  async transform(value: CreateUserDto) {
    const { phone } = value;
    if (phone.length === 10) {
      return { ...value, phone: `+38${phone}` };
    }
    return value;
  }
}
