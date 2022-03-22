import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'pizza',
  //     'italian',
  //     'https://nietylkopasta.pl/wp-content/uploads/2020/04/wloskapiska-12.jpg',
  //     [
  //       new Ingredient('cheese', 100),
  //       new Ingredient('pepperoni', 1000)
  //     ]
  //     ),
  //     new Recipe(
  //       'burger',
  //       'usa',
  //       'https://www.unileverfoodsolutions.pl/dam/global-ufs/mcos/NEE/calcmenu/recipes/PL-recipes/sandwiches/burger-francuski-z-kozim-serem-marmolad%C4%85-z-czerwonej-cebuli-i-rukol%C4%85/main-header.jpg',
  //       [
  //         new Ingredient('meat', 2),
  //         new Ingredient('cheese', 2)
  //       ]
  //       ),
  // ];

  private recipes: Recipe[] = []

  constructor(private slSerice: ShoppingListService ){}

  getRecipes(){
    return [...this.recipes];
  }

  getRecipe(index: number): Recipe{
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slSerice.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes])
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([...this.recipes])

  }

  deleteRecipe(index: number){
    this.recipes = this.recipes.filter((e, i) => i !== index);
    this.recipesChanged.next([...this.recipes])
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next([...this.recipes])
  }
}
