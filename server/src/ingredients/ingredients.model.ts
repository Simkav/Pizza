import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { PizzaIngredients } from 'src/pizzas/pizza-ingredients.model';
import { Pizza } from 'src/pizzas/pizza.model';

interface IngredientCreatioAttributes {
  name: string;
}
@Table({ tableName: 'ingredients' })
export class Ingredient extends Model<Ingredient, IngredientCreatioAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @BelongsToMany(() => Pizza, () => PizzaIngredients)
  pizzas: Pizza[];

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;
}
