import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingList } from 'src/shopping';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  
  recipeServerUrl = `${environment.serverPath}api`;

  constructor(
    private http: HttpClient,
    private user: UserService) { }

  getList() : Observable<ShoppingList> {
    if(!this.user.accessToken) {
      return of();
    }
    return this.http.get<ShoppingList>((this.recipeServerUrl + '/shoppinglist'), {
      headers: {
        'Authorization':  this.user.accessToken
      }
    });
  }
}
