import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent {
  @Output() search = new EventEmitter<string>();
  searchString: string = '';

  doSearch() {
    this.search.emit(this.searchString);
  }
}
