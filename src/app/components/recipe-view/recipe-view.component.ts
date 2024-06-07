import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf, NgFor, NgClass, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Recipe } from 'src/recipe';
import { FoodService } from '../../services/food.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, DecimalPipe, TitleCasePipe]
})
export class RecipeViewComponent implements OnInit {
  recipe? : Recipe;
  serving? : number;
  servingRation = 1;
  selectedDirection = 0;
  recipeServerUrl = environment.serverPath;

  get loggedIn() {
    return this.user.loggedIn;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private foodService : FoodService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.foodService.getRecipe(id).subscribe(recipe => {
        this.recipe = recipe;
        this.serving = recipe.serving;
      });
    }
  }
  increaseServing() {
    this.updateServing(1);
  }

  decreaseServing() {
    if(this.serving && this.serving > 1) {
      this.updateServing(-1);
    }
  }

  updateServing(diff : number) {
    if(this.serving && this.recipe?.serving) {
      this.serving += diff;
      this.servingRation = this.serving / this.recipe?.serving;
    }
  }

  selectDirection(idx : number) {
    this.selectedDirection = idx;
  }

  edit() {
    this.router.navigate(['/edit'], {state: {recipe: this.recipe}});
  }

  delete() {
    if(this.recipe?._id) {
      this.foodService.deleteRecipe(this.recipe._id).subscribe({
        next: (success) => {
          if(success) {
            this.router.navigate(['/recipes']);
          } else {
            console.log('Could not delete recipe');
          }
        },
        error: err => console.log(err)
      });
    }
  }
}
