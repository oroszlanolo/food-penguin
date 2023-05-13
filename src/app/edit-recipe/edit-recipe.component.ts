import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FoodService } from '../food.service';
import { Recipe } from 'src/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  url = '';
  recipe? : Recipe;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private foodService : FoodService) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('url') ?? '';
    if(this.url !== '') {
      this.foodService.scrapeRecipe(this.url).subscribe(recipe => {
        this.recipe = recipe;
      });
    }
  }

  addRecipe() {
    if(this.recipe) {
      console.log("auihciueshiu");
      this.foodService.addRecipe(this.recipe).subscribe(res => 
        this.router.navigate([`/recipe/${res}`]));
    }
  }
}
