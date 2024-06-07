import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Recipe } from 'src/recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  recipeServerUrl = `${environment.serverPath}api`;
  constructor(
    private user: UserService,
    private http: HttpClient,
    ) { }

  getRecipes() : Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeServerUrl + '/recipes');
  }

  searchForRecipe(text: string) : Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeServerUrl + '/recipes/search?text=' + text);
  }

  getRecipe(id: string) : Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeServerUrl + '/recipe?id=' + id);
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

  addOrUpdateRecipe(recipe: Recipe) : Observable<string> {
    if(recipe._id) {
      return this.updateRecipe(recipe);
    } else {
      return this.addRecipe(recipe);
    }
  }

  addRecipe(recipe: Recipe) : Observable<string> {
    if(!this.user.accessToken) {
      return of('');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.user.accessToken
      })
    };
    return this.http.post<{id: string}>(this.recipeServerUrl + '/recipe', {recipe: JSON.stringify(recipe)}, httpOptions)
    .pipe(map(r => r.id));
  }

  updateRecipe(recipe: Recipe) : Observable<string> {
    if(!this.user.accessToken) {
      return of('');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.user.accessToken
      })
    };
    return this.http.put<{id: string}>(this.recipeServerUrl + '/recipe', {recipe: JSON.stringify(recipe)}, httpOptions)
    .pipe(map(r => r.id));
  }

  deleteRecipe(id: string) : Observable<boolean> {
    if(!this.user.accessToken) {
      return of(false);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  this.user.accessToken
      })
    };
    return this.http.delete<{success: boolean}>(this.recipeServerUrl + '/recipe?id=' + id, httpOptions).
    pipe(map(res => res.success));
  }
}
