import { ApiConsumes, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PizzasService } from './pizzas.service';
import { isAdminGuard } from 'src/auth/isAdmin.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('pizzas')
@ApiTags('pizza')
export class PizzasController {
  constructor(private pizzaService: PizzasService) {}

  @Get()
  async getAll() {
    return await this.pizzaService.getAll();
  }
  @Get('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async getById(@Param('id') id: number) {
    return await this.pizzaService.findById(id);
  }
  @Delete('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: number) {
    return await this.pizzaService.delete(id);
  }
  @Patch('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updatePizzaDto: UpdatePizzaDto,
  ) {
    return await this.pizzaService.update(id, updatePizzaDto);
  }
  @Post()
  @UseGuards(isAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(
    @Body(new ValidationPipe()) createPizzaDto: CreatePizzaDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.pizzaService.create(createPizzaDto, image);
  }
  @Patch('/:id/image')
  @UseGuards(isAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['image'],
      properties: {
        image: {
          description: 'Any image type, with 20mb threshold',
          type: 'file',
        },
      },
    },
  })
  async updateImg(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.pizzaService.updateImage(id, image);
  }
  @UseGuards(isAdminGuard)
  @Patch('/:id/ingredients')
  @ApiBearerAuth()
  async updateIngredients(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateIngredientsDto: UpdateIngredientsDto,
  ) {
    return await this.pizzaService.updateIngredients(id, updateIngredientsDto);
  }
}
