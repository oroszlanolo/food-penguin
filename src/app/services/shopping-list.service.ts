import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingList } from 'src/shopping';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  
  recipeServerUrl = "http://127.0.0.1:3000/api";

  constructor(
    private http: HttpClient) { }

  getList() : Observable<ShoppingList> {
    return this.http.get<ShoppingList>(this.recipeServerUrl + '/shoppinglist');
  }
}
