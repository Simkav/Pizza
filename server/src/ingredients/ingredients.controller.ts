import { SequelizeFilter } from './../errorHandlers/sequelize-handler';
import { ValidationPipe } from './../pipes/validation.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
  Req,
  UseFilters,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { isAdminGuard } from 'src/auth/isAdmin.guard';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientsService } from './ingredients.service';
import { Request } from 'express';

@UseFilters(new SequelizeFilter())
@Controller('ingredients')
@ApiTags('ingredients')
export class IngredientsController {
  constructor(private ingredientService: IngredientsService) {}
  @Get()
  async getAll() {
    return await this.ingredientService.getAll();
  }
  @Post()
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async create(@Body(new ValidationPipe()) ingredientDto: CreateIngredientDto) {
    return await this.ingredientService.create(ingredientDto);
  }
  @Get('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async getById(@Req() req: Request) {
    return req.ingredientInstance;
  }
  @Delete('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async deleteById(@Req() req: Request) {
    return await this.ingredientService.destroyInstance(req.ingredientInstance);
  }
  @Patch('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async updateIngredient(
    @Req() req: Request,
    @Body(new ValidationPipe()) ingredientDto: CreateIngredientDto,
  ) {
    return await this.ingredientService.update(
      req.ingredientInstance,
      ingredientDto,
    );
  }
}
