import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  BeforeSave,
} from 'sequelize-typescript';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { PizzaIngredients } from './pizza-ingredients.model';

interface PizzaCreatioAttributes {
  name: string;
  price: number;
  weight: number;
  image: string;
}

const pizzasPath = '/pizzas/';

@Table({ tableName: 'pizzas' })
export class Pizza extends Model<Pizza, PizzaCreatioAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @BelongsToMany(() => Ingredient, () => PizzaIngredients)
  ingredients: Ingredient[];

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  weight: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @BeforeSave({ name: 'append image path' })
  static async appendImage(instance: Pizza) {
    if (instance.changed('image')) {
      instance.image = pizzasPath + instance.image;
    }
  }
}
