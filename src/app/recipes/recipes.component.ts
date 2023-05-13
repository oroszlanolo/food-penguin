import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Recipe } from 'src/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  recipeServerUrl = "http://127.0.0.1:3000/";
  recipes : Recipe[] = [];
  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
      this.foodService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }
  onSearch(searchText: string) {
    this.foodService.searchForRecipe(searchText).subscribe(recipes => this.recipes = recipes);
  }
}
