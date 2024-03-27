import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FoodService } from '../food.service';
import { Recipe } from 'src/recipe';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  url = '';
  id = '';
  recipe? : Recipe;
  recipeForm = this.fb.group({
    name: ['', Validators.required],
    serving: [0, Validators.required],
    preparationTime: this.fb.group({
      preparation: '',
      owen: '',
      total: ''
    })
  });

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private foodService : FoodService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('url') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    if(this.url !== '') {
      this.foodService.scrapeRecipe(this.url).subscribe(recipe => {
        this.recipe = recipe;
        this.#updateRecipeForm();
      });
    } else if(this.id !== '') {
      this.foodService.getRecipe(this.id).subscribe(recipe => {
        this.recipe = recipe;
        this.#updateRecipeForm();
      })
    }
  }

  addRecipe() {
    if(this.recipe) {
      this.foodService.addRecipe(this.recipe).subscribe(res => 
        this.router.navigate([`/recipe/${res}`]));
    }
  }

  onSubmit() {
    if(this.recipe) {
      const name = this.recipeForm.get('name')!.value;
      if(name != null) this.recipe.name = name;
    }
    console.log(this.recipe);
  }

  #updateRecipeForm() {
    if(this.recipe) {
      this.recipeForm.get('name')?.setValue(this.recipe.name);
    }
  }
}
