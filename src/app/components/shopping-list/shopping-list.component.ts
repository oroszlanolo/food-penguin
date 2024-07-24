import { Component, OnInit } from '@angular/core';
import { ShoppingList, ShoppingListItem, ShoppingListNewItem } from 'src/shopping';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    standalone: true,
    imports: [NgFor, FormsModule ]
})
export class ShoppingListComponent implements OnInit{
  Object = Object;
  shoppingList: ShoppingList = [];
  completedList: ShoppingList = [];
  error: string | null = null;
  loading = false;
  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingService.getList().subscribe(shopList => this.updateShoppingList(shopList));
  }

  onAddItem(addItemForm: NgForm) {
    console.log(addItemForm);
    const value = addItemForm.form.value;
    if(value?.name != undefined && value?.name != null && value?.name != '') {
      this.loading = true;
      const item : ShoppingListNewItem = {
        name: value.name,
        completed: false
      }
      if(value?.quantity) {
        item.quantity = value.quantity;
      }
      if(value?.unit) {
        item.unit = value.unit;
        item.quantity = value.quantity || 1;
      }
      console.log('asd');
      this.shoppingService.addItem(item).subscribe({
        next: shopList => {
          this.updateShoppingList(shopList);
          addItemForm.reset();
          this.error = null;
        },
        error: err => {
          this.error = 'An error has occured';
        },
        complete: () => this.loading = false
      });
    }
  }

  private updateShoppingList(unsortedList: ShoppingList) {
    this.shoppingList = unsortedList.filter(i => !i.completed);
    this.completedList = unsortedList.filter(i => i.completed);
  }

  completeItem(item: ShoppingListItem) {
    this.shoppingList = this.shoppingList.filter(i => i._id != item._id);
    this.completedList.push(item);
    this.shoppingService.completeItem(item._id).subscribe();
  }

  uncompleteItem(item: ShoppingListItem) {
    this.completedList = this.completedList.filter(i => i._id != item._id);
    this.shoppingList.push(item);
    this.shoppingService.uncompleteItem(item._id).subscribe();
  }
  clearCompleted() {
    this.completedList = [];
    this.shoppingService.clearCompleted().subscribe();
  }

  share() {
    let shareText = '';
    this.shoppingList.forEach(item => {
      let itemText = '';
      if(item.quantity) {
        itemText += item.quantity;
        itemText += ' ';
      }
      if(item.unit) {
        itemText += item.unit;
        itemText += ' ';
      }
      itemText += item.name;
      itemText += '\n';
      shareText += itemText;
    })
    navigator.share({
      text: shareText
    })
  }

}
