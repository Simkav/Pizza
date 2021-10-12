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
import { ApiTags } from '@nestjs/swagger';
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
  @UseGuards(isAdminGuard)
  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.ingredientService.findById(id);
  }
  @UseGuards(isAdminGuard)
  @Post()
  async create(@Body() ingredientDto: CreateIngredientDto) {
    return await this.ingredientService.create(ingredientDto);
  }
  @UseGuards(isAdminGuard)
  @Delete('/:id')
  async deleteById(@Param('id') id: number) {
    const ingredient = await this.ingredientService.findById(id);
    return await this.ingredientService.destroyInstance(ingredient);
  }
  @UseGuards(isAdminGuard)
  @Patch('/:id')
  async updateIngredient(
    @Param('id') id: number,
    @Body() ingredientDto: CreateIngredientDto,
  ) {
    const ingredient = await this.ingredientService.findById(id);
    return await this.ingredientService.update(ingredient, ingredientDto);
  }
}
