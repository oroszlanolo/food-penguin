import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  recipeServerUrl = "http://127.0.0.1:3000/api";
  constructor(
    private http: HttpClient) { }

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
    return this.http.get<Recipe>(this.recipeServerUrl + '/recipe/scrape?url=' + url);
  }

  addRecipe(recipe: Recipe) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<Recipe>(this.recipeServerUrl + '/recipe', {recipe: JSON.stringify(recipe)}, httpOptions);
  }
}
