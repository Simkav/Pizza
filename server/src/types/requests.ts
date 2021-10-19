import { Request } from 'express';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { Pizza } from 'src/pizzas/pizza.model';

type userObj = {
  id: number;
  isAdmin: boolean;
};

export interface RequestWithUser extends Request {
  userObj?: userObj;
}

export interface RequestWithUserPizza extends RequestWithUser {
  pizzaInstance: Pizza;
}

export interface RequestWithUserIngredient extends RequestWithUser {
  ingredientInstance: Ingredient;
}
