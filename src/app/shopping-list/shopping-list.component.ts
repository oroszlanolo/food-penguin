import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/shopping';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  shoppingList: ShoppingList = [];
  completed: ShoppingList = [{name: "cukor"},{name: "só"},{name: "Minden mi jó"},{name: "1 kis körte"}, {name: "valami nagoyn hosszú szöveg ide a végére"}];

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingService.getList().subscribe(shopList => this.shoppingList = shopList);
  }

}
