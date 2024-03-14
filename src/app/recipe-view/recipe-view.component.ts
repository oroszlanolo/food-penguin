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
  servingRation = 1;
  selectedDirection = 0;
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
}
