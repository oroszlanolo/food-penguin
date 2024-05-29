import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Recipe } from 'src/recipe';
import { environment } from 'src/environments/environment';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RecipeSearchComponent } from '../recipe-search/recipe-search.component';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    standalone: true,
    imports: [RecipeSearchComponent, NgFor, NgIf, TitleCasePipe]
})
export class RecipesComponent implements OnInit{
  recipeServerUrl = environment.serverPath;
  recipes : Recipe[] = [];
  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
      this.foodService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }
  onSearch(searchText: string) {
    this.foodService.searchForRecipe(searchText).subscribe(recipes => this.recipes = recipes);
  }
}
