import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-recipe-search',
    templateUrl: './recipe-search.component.html',
    styleUrls: ['./recipe-search.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class RecipeSearchComponent {
  @Output() search = new EventEmitter<string>();
  searchString: string = '';

  doSearch() {
    this.search.emit(this.searchString);
  }
}
