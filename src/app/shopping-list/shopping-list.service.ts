import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('tomatoes', 6),
    new Ingredient('ham', 16)
  ];

  getIngredients(){
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next([...this.ingredients])
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]){
    // for(let ingr of ingredients){
    //   this.addIngredient(ingr)
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next([...this.ingredients])
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next([...this.ingredients])
  }

  deleteIngredient(index: number){
    this.ingredients = this.ingredients.filter((e,i) => i !== index);
    this.ingredientsChanged.next([...this.ingredients])

  }
}
