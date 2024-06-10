import { Component, OnInit, booleanAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf, NgFor, NgClass, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Ingredient, Recipe } from 'src/recipe';
import { FoodService } from '../../services/food.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { ingredientNormalizerMult } from 'src/utils/ingredient_helper';


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

  get selectedIngredientNum() {
    return this.ingredientSelection.reduce((prev, curr) => prev + curr.reduce((prev, curr) => prev + (curr ? 1 : 0), 0), 0); 
  }

  get hasSelectedIngredient() {
    return this.ingredientSelection.reduce((prev, curr) => prev || curr.reduce((prev, curr) => curr || prev, false), false); 
  }

  ingredientSelection : boolean[][] = [];

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
        for(let section of this.recipe?.sections ?? []) {
          const iSection = Array.from(new Array(section.ingredients.length), () => false);
          this.ingredientSelection.push(iSection);
        }
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

  setServingRation(n: number) {
    if(this.serving && this.recipe?.serving) {
      this.servingRation = n;
      this.serving = this.recipe?.serving * this.servingRation;
    }
  }

  updateServing(diff : number) {
    if(this.serving && this.recipe?.serving) {
      this.serving += diff;
      this.servingRation = this.serving / this.recipe?.serving;
    }
  }
  resetServing() {
    this.setServingRation(1);
  }

  toggleIngredient(sectionNum: number, ingredientNum: number) {
    this.ingredientSelection[sectionNum][ingredientNum] = !this.ingredientSelection[sectionNum][ingredientNum];
  }
  getIngredient(sectionNum: number, ingredientNum: number) : Ingredient | undefined {
    return this.recipe?.sections[sectionNum].ingredients[ingredientNum];
  }
  getSelectedIngredients() : Ingredient[] {
    const ingredients : Ingredient[] = [];
    for(let i = 0; i < this.ingredientSelection.length; i++) {
      for(let j = 0; j < this.ingredientSelection[i].length; j++) {
        if(this.ingredientSelection[i][j]) {
          const ingredient = this.getIngredient(i, j);
          if(ingredient) {
            ingredients.push(ingredient);
          }
        }
      }
    }
    return ingredients;
  }
  normalize() {
    const selectedIngredients = this.getSelectedIngredients();
    if(selectedIngredients.length == 0) {
      return;
    }
    const baseIngredient : Ingredient = this.getSelectedIngredients()[0];
    const mult = ingredientNormalizerMult(baseIngredient);
    this.setServingRation(mult);
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
