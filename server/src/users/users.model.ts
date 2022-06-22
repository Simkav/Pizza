import {
  Model,
  Table,
  Column,
  DataType,
  BeforeSave,
} from 'sequelize-typescript';
import * as bcryptjs from 'bcryptjs';

interface UserCreatioAttributes {
  phone: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreatioAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  email: string;

  @Column({ type: DataType.DECIMAL, defaultValue: 0 })
  bonus: number;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_admin',
    defaultValue: false,
    allowNull: true,
  })
  isAdmin: boolean;

  async checkPassword(password) {
    return await bcryptjs.compare(password, this.password);
  }

  @BeforeSave({ name: 'hashPassword' })
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      instance.password = await bcryptjs.hash(instance.password, 10);
    }
  }
}
