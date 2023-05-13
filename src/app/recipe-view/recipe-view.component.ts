import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from 'src/recipe';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
  recipe? : Recipe;
  serving? : number;
  recipeServerUrl = "http://127.0.0.1:3000/";
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private foodService : FoodService
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
    if(this.serving) {
      this.serving++;
    }
  }

  decreaseServing() {
    if(this.serving) {
      this.serving--;
    }
  }
}
