import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  recipeServerUrl = "http://127.0.0.1:3000/api";
  constructor(
    private user: UserService,
    private http: HttpClient,
    ) { }

  getRecipes() : Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeServerUrl + '/recipes');
  }

  getRecipe(id: string) : Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeServerUrl + '/recipe?id=' + id);
  }
  searchForRecipe(text: string) : Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeServerUrl + '/recipes/search?text=' + text);
  }

  scrapeRecipe(url: string) : Observable<Recipe> {
    if(!this.user.accessToken) {
      return of();
    }
    return this.http.get<Recipe>(this.recipeServerUrl + '/recipe/scrape?url=' + url, {
      headers: {
        'Authorization':  this.user.accessToken
      }
    });
  }

  addOrUpdateRecipe(recipe: Recipe) : Observable<any> {
    if(recipe._id) {
      return this.updateRecipe(recipe);
    } else {
      return this.addRecipe(recipe);
    }
  }

  addRecipe(recipe: Recipe) : Observable<any> {
    if(!this.user.accessToken) {
      return of('');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.user.accessToken
      })
    };
    return this.http.post<Recipe>(this.recipeServerUrl + '/recipe', {recipe: JSON.stringify(recipe)}, httpOptions);
  }

  updateRecipe(recipe: Recipe) : Observable<any> {
    if(!this.user.accessToken) {
      return of('');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.user.accessToken
      })
    };
    console.log(`id: ${recipe._id}`);
    return this.http.put<Recipe>(this.recipeServerUrl + '/recipe', {recipe: JSON.stringify(recipe)}, httpOptions);
  }
}
