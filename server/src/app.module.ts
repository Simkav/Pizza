import { JwtModule } from '@nestjs/jwt';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { parseAuth } from './auth/parse-auth.middleware';
import { PizzasController } from './pizzas/pizzas.controller';
import { IngredientsController } from './ingredients/ingredients.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PizzasModule,
    ConfigModule.forRoot(),
    IngredientsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true,
    }),
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(parseAuth)
      .exclude(
        { path: 'pizzas', method: RequestMethod.GET },
        { path: 'ingredients', method: RequestMethod.GET },
      )
      .forRoutes(PizzasController, IngredientsController);
  }
}
