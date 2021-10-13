import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { Pizza } from './pizza.model';

@Table({ tableName: 'pizza_ingredients', createdAt: false, updatedAt: false })
export class PizzaIngredients extends Model<PizzaIngredients> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Ingredient)
  @Column({
    type: DataType.INTEGER,
  })
  ingredientId: number;

  @ForeignKey(() => Pizza)
  @Column({
    type: DataType.INTEGER,
  })
  pizzaId: number;
}
