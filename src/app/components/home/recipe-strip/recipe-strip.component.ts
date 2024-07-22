import { Component, input, OnInit, signal } from '@angular/core';
import { FoodService, HomeType } from 'src/app/services/food.service';
import { Recipe } from 'src/recipe';
import { RecipeCardComponent } from "../../shared/recipe-card/recipe-card.component";


@Component({
  selector: 'app-recipe-strip',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipe-strip.component.html',
  styleUrl: './recipe-strip.component.css'
})
export class RecipeStripComponent implements OnInit{
  homeType = input.required<HomeType>();
  recipes = signal<Recipe[]>([]);

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.homeRecipes(this.homeType()).subscribe(res => {
      this.recipes.set(res.recipes.data);
    });
  }

}
