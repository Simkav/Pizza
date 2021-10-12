import { ApiConsumes, ApiTags } from '@nestjs/swagger';
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
  async getById(@Param('id') id: number) {
    return await this.pizzaService.findById(id);
  }
  @UseGuards(isAdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.pizzaService.delete(id);
  }
  @UseGuards(isAdminGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ) {
    return await this.pizzaService.update(id, updatePizzaDto);
  }
  @UseGuards(isAdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createPizzaDto: CreatePizzaDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.pizzaService.create(createPizzaDto, image);
  }
  @UseGuards(isAdminGuard)
  @Patch('/:id/image')
  @UseInterceptors(FileInterceptor('img'))
  async updateImg(
    @Param('id') id: number,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.pizzaService.updateImage(id, img);
  }
  @UseGuards(isAdminGuard)
  @Patch('/:id/ingredients')
  async updateIngredients(
    @Param('id') id: number,
    @Body() updateIngredientsDto: UpdateIngredientsDto,
  ) {
    return await this.pizzaService.updateIngredients(id, updateIngredientsDto);
  }
}
