import { Ingredient } from 'src/ingredients/ingredients.model';
import { Pizza } from 'src/pizzas/pizza.model';

declare module 'express' {
  type UserObj = { id: number; isAdmin: boolean };
  interface Request {
    userObj?: UserObj;
    pizzaInstance?: Pizza;
    ingredientInstance?: Ingredient;
  }
}
