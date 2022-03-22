import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipes.service";

const url = 'https://ng-course-1d12a-default-rtdb.firebaseio.com'

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService){

  }

  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http.put(`${url}/recipes.json`, recipes).subscribe()
  }

  fetchRecipes(){
      return this.http.get<Recipe[]>(`${url}/recipes.json`,
      ).pipe(map(recipes => {
        return recipes.map(e => {
          return {
            ...e,
            ingredients: e.ingredients || []
          }
        })
    }),
    tap(recipes => {
      this.recipesService.setRecipes(recipes)
    }))

  }
}
