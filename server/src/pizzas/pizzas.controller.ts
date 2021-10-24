import { SequelizeFilter } from './../errorHandlers/sequelize-handler';
import {
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
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
  Req,
  UseFilters,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PizzasService } from './pizzas.service';
import { isAdminGuard } from 'src/auth/isAdmin.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreatePizzaPipe } from 'src/pipes/create-pizza.pipe';
import { RequestWithUserPizza } from 'src/types/requests';

@UseFilters(new SequelizeFilter())
@Controller('pizzas')
@ApiTags('pizza')
export class PizzasController {
  constructor (private pizzaService: PizzasService) {}

  @Get()
  async getAll () {
    return await this.pizzaService.getAll();
  }
  @Get('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  async getById (@Param('id') id: number) {
    return await this.pizzaService.findById(id);
  }
  @Delete('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async delete(@Req() req: RequestWithUserPizza) {
    return await this.pizzaService.deleteInstance(req.pizzaInstance);
  }
  @Patch('/:id')
  @UseGuards(isAdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Body(new ValidationPipe()) updatePizzaDto: UpdatePizzaDto,
    @Req() req: RequestWithUserPizza,
  ) {
    return await this.pizzaService.updateInstance(
      req.pizzaInstance,
      updatePizzaDto,
    );
  }
  @Post()
  @UseGuards(isAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(
    @Body(new ValidationPipe(), new CreatePizzaPipe())
    createPizzaDto: CreatePizzaDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.pizzaService.create(createPizzaDto, image);
  }
  @Patch('/:id/image')
  @UseGuards(isAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
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
    @UploadedFile() image: Express.Multer.File,
    @Req() req: RequestWithUserPizza,
  ) {
    return await this.pizzaService.updateImage(req.pizzaInstance, image);
  }
  @UseGuards(isAdminGuard)
  @Patch('/:id/ingredients')
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  async updateIngredients(
    @Body(new ValidationPipe()) updateIngredientsDto: UpdateIngredientsDto,
    @Req() req: RequestWithUserPizza,
  ) {
    return await this.pizzaService.updateIngredients(
      req.pizzaInstance,
      updateIngredientsDto,
    );
  }
}
