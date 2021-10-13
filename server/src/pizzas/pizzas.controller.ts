import { ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
    @Body() updatePizzaDto: UpdatePizzaDto,
  ) {
    return await this.pizzaService.update(id, updatePizzaDto);
  }
  @Post()
  @UseGuards(isAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createPizzaDto: CreatePizzaDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.pizzaService.create(createPizzaDto, image);
  }
  @Patch('/:id/image')
  @UseGuards(isAdminGuard)
  @UseInterceptors(FileInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  async updateImg(
    @Param('id') id: number,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.pizzaService.updateImage(id, img);
  }
  @UseGuards(isAdminGuard)
  @Patch('/:id/ingredients')
  @ApiBearerAuth()
  async updateIngredients(
    @Param('id') id: number,
    @Body() updateIngredientsDto: UpdateIngredientsDto,
  ) {
    return await this.pizzaService.updateIngredients(id, updateIngredientsDto);
  }
}
