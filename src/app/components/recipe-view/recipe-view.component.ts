import { Component, OnInit, booleanAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf, NgFor, NgClass, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Ingredient, Recipe } from 'src/recipe';
import { FoodService } from '../../services/food.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { ingredientNormalizerMult } from 'src/utils/ingredient_helper';
import { ImageViewComponent } from "../image-view/image-view.component";
import { ShoppingListNewItem } from 'src/shopping';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, DecimalPipe, TitleCasePipe, ImageViewComponent, FormsModule ]
})
export class RecipeViewComponent implements OnInit {
  recipe? : Recipe;
  serving? : number;
  servingRation = 1;
  selectedDirection = {
    section: 0,
    direction: 0
  };
  recipeServerUrl = environment.serverPath;
  showImages = false;

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
    private user: UserService,
    private shoppingService: ShoppingListService,
    private toastr: ToastrService
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

  deselectAllIngredients() {
    this.ingredientSelection.forEach(section => {
      for(let i = 0; i < section.length; i++) {
        section[i] = false;
      }
    })
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
    const baseIngredient : Ingredient = selectedIngredients[0];
    const mult = ingredientNormalizerMult(baseIngredient);
    this.setServingRation(mult);
  }

  addToShoppingList() {
    const selectedIngredients = this.getSelectedIngredients();
    if(selectedIngredients.length == 0) {
      return;
    }
    const itemsToAdd : ShoppingListNewItem[] = selectedIngredients.map(i => {
      return {
        name: i.name,
        unit: i.unit,
        quantity: parseFloat((i.quantity * this.servingRation).toFixed(1)),
        note: i.note,
        completed: false
      }
    });
    this.shoppingService.addItems(itemsToAdd).subscribe();
    this.deselectAllIngredients();
    this.toastr.success(
      `${itemsToAdd.length} item${itemsToAdd.length > 1 ?  's' : ''} added to the shopping list`,
      'Success!');
  }

  selectDirection(section: number, idx : number) {
    this.selectedDirection.section = section;
    this.selectedDirection.direction = idx;
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
  viewImages() {
    this.showImages = true;
  }
  closeImages() {
    this.showImages = false;
  }
}
