import { ValidationPipe } from './../pipes/validation.pipe';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { isAdminGuard } from 'src/auth/isAdmin.guard';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
@ApiTags('ingredients')
export class IngredientsController {
  constructor(private ingredientService: IngredientsService) {}
  @Get()
  async getAll() {
    return await this.ingredientService.getAll();
  }
  @Get('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async getById(@Param('id') id: number) {
    return await this.ingredientService.findById(id);
  }
  @Post()
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async create(@Body(new ValidationPipe()) ingredientDto: CreateIngredientDto) {
    return await this.ingredientService.create(ingredientDto);
  }
  @Delete('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async deleteById(@Param('id') id: number) {
    const ingredient = await this.ingredientService.findById(id);
    return await this.ingredientService.destroyInstance(ingredient);
  }
  @Patch('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async updateIngredient(
    @Param('id') id: number,
    @Body(new ValidationPipe()) ingredientDto: CreateIngredientDto,
  ) {
    const ingredient = await this.ingredientService.findById(id);
    return await this.ingredientService.update(ingredient, ingredientDto);
  }
}
