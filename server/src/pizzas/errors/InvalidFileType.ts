import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileType extends HttpException {
  constructor() {
    super('Wrong file type', HttpStatus.BAD_REQUEST);
  }
}
