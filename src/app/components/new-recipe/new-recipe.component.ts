import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./new-recipe.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class NewRecipeComponent {
  url = '';

  constructor(private router: Router) {}

  importUrl() {
    this.router.navigate(['/edit', { url: this.url }]);
  }
}
