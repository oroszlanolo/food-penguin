import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Recipe } from 'src/recipe';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  host: {
    '[attr.display]': 'block' 
  }
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  recipeServerUrl = environment.serverPath;
}
