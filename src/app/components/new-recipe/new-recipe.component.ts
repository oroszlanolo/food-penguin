import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./new-recipe.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class NewRecipeComponent {
  url = '';
  loggedIn = this.userService.loggedIn;
  error? : string;
  loading = false;

  get importDisabled() {
    return this.loading || !this.loggedIn || this.url.length === 0;
  }
  constructor(private router: Router, private userService: UserService, private foodService: FoodService) {}


  importUrl() {
    this.error = undefined;
    this.loading = true;
    this.foodService.scrapeRecipe(this.url).subscribe({
      next: recipe => {
        this.loading = false;
        this.router.navigate(['/edit'], {state: {recipe: recipe, url: this.url}});
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Unexpected error happened';
      }
    });
  }
  
  goToEdit() {
    this.router.navigate(['/edit']);
  }

}
