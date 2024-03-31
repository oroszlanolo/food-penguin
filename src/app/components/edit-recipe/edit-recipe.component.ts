import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Allergen, Difficulty, DishType, Ingredient, IngredientSection, Label, Recipe, When } from 'src/recipe';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  recipeServerUrl = environment.serverPath;
  url = '';
  id = '';
  recipe? : Recipe;
  object = Object;
  recipeForm = this.fb.group({
    name: ['', Validators.required],
    serving: [0, Validators.required],
    difficulty: 0,
    dishType: this.fb.group({
      cold_appetizer: false,
      warm_appetizer: false,
      amuse_bouche: false,
      dessert: false,
      garnish: false,
      main_dish: false,
      soup: false,
      drink: false,
      other_course: false,
    }),
    when: this.fb.group({
      breakfast: false,
      lunch: false,
      dinner: false,
      snack: false,
      always: false
    }),
    preparationTime: this.fb.group({
      preparation: 0,
      owen: 0,
      cooking: 0,
      total: [{value: 0, disabled: true}],
    }),
    allergens: this.fb.group({
      "sugar-free": false,
      "lactose-free": false,
      "dairy-free": false,
      "egg-free": false,
      "gluten-free": false,
    }),
    labels: this.fb.group({
      cheap: false,
      vegan: false
    }),
    ingredients: this.fb.array([
      this.fb.group({
        section: 'Main',
        ingredients: this.fb.array([])
      })
    ]),
    directions: this.fb.array([]),
  });

  difficultyTexts = ['Easy','Intermediate','Expert'];

  get difficulty() {
    return this.recipeForm.get('difficulty')?.value ?? 0;
  }

  get directions() {
    return this.recipeForm.get('directions') as FormArray;
  }

  get dishTypes() {
    return this.recipeForm.get('dishType') as FormGroup;
  }
  
  get whens() {
    return this.recipeForm.get('when') as FormGroup;
  }

  get allergens() {
    return this.recipeForm.get('allergens') as FormGroup;
  }

  get labels() {
    return this.recipeForm.get('labels') as FormGroup;
  }
  
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  getIngredientsFromSection(section : AbstractControl<any, any>) {
    return section.get('ingredients') as FormArray;
  }

  addSection() {
    this.ingredients.push(this.fb.group({
      section: '',
      ingredients: this.fb.array([])
    }))
  }

  addIngredient(section: number, name = '', quantity = 0, unit = '', note = '') {
    const iArray = this.ingredients.controls[section].get('ingredients') as FormArray;
    if(iArray) {
      iArray.push(this.fb.group({
        quantity: quantity,
        unit: unit,
        name: name,
        note: note
      }));
    }
  }

  removeSection(idx: number) {
    this.ingredients.removeAt(idx);
  }
  removeIngredient(sectionIdx: number, ingredientIdx: number) {
    const iArray = this.ingredients.controls[sectionIdx].get('ingredients') as FormArray;
    if(iArray) {
      iArray.removeAt(ingredientIdx);
    }
  }

  addDirection(dir: string = '') {
    this.directions.push(this.fb.control(dir));
  }
  removeDirection(i : number) {
    this.directions.removeAt(i);
  }

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private foodService : FoodService,
    private imgService: ImageService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('url') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(this.object.keys(this.dishTypes));
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

  addImg(event : Event) {
    this.imgService.addImage(event).subscribe(resp => {
      console.log(resp);
    });
  }

  onSubmit() {
    this.#updateRecipeFromForm();
    console.log(this.recipe);
    // this.addRecipe();
  }

  #updateRecipeForm() {
    if(this.recipe) {
      console.log(this.recipe);
      this.recipeForm.get('name')?.setValue(this.recipe.name);
      this.recipeForm.get('serving')?.setValue(this.recipe.serving);
      const diffControl = this.recipeForm.get('difficulty')
      if(this.recipe.difficulty == 'easy') {
        diffControl?.setValue(0);
      } else if(this.recipe.difficulty == 'intermediate') {
        diffControl?.setValue(1);
      } else if(this.recipe.difficulty == 'expert') {
        diffControl?.setValue(2);
      }
      for(let dt of this.recipe.dishType) {
        const dtControl = this.dishTypes.get(dt);
        if(dtControl) {
          dtControl.setValue(true);
        }
      }
      for(let allergen of this.recipe.allergens) {
        const allergenControl = this.allergens.get(allergen);
        if(allergenControl) {
          allergenControl.setValue(true);
        }
      }
      for(let when of this.recipe.when) {
        const whenControl = this.whens.get(when);
        if(whenControl) {
          whenControl.setValue(true);
        }
      }
      for(let label of this.recipe.labels) {
        const labelControl = this.labels.get(label);
        if(labelControl) {
          labelControl.setValue(true);
        }
      }
      if(this.recipe.preparationTime.preparation) {
        this.recipeForm.get('preparationTime')?.get('preparation')?.setValue(this.recipe.preparationTime.preparation);
      }
      if(this.recipe.preparationTime.owen) {
        this.recipeForm.get('preparationTime')?.get('owen')?.setValue(this.recipe.preparationTime.owen);
      }
      if(this.recipe.preparationTime.cooking) {
        this.recipeForm.get('preparationTime')?.get('cooking')?.setValue(this.recipe.preparationTime.cooking);
      }
      if(this.recipe.preparationTime.total) {
        this.recipeForm.get('preparationTime')?.get('total')?.setValue(this.recipe.preparationTime.total);
      }

      for(let i = 0; i < this.recipe.ingredients.length; i++) {
        const section = this.recipe.ingredients[i];
        if(i > 0)
          this.addSection();
        this.ingredients.controls[i].get('section')?.setValue(section.section);
        for(let ingredient of section.ingredients) {
          this.addIngredient(i, ingredient.name, ingredient.quantity, ingredient.unit, ingredient.note);
        }
      }

      for(let dir of this.recipe.directions) {
        this.addDirection(dir);
      }
    }
  }

  #updateRecipeFromForm() {
    if(this.recipe) {
      const name = this.recipeForm.get('name')!.value;
      if(name != null) this.recipe.name = name;
      const serving = this.recipeForm.get('serving')!.value;
      if(serving != null) this.recipe.serving = serving;

      const difficulties : Difficulty[] = ['easy', 'intermediate', 'expert'];
      this.recipe.difficulty = difficulties[this.difficulty];

      const dishTypeArray : DishType[] = [];
      for(let dt of Object.keys(this.dishTypes.controls)) {
        if(this.dishTypes.get(dt)?.value) {
          dishTypeArray.push(dt as DishType);
        }
      }
      if(dishTypeArray.length > 0) {
        this.recipe.dishType = dishTypeArray;
      }
      const allergenArray : Allergen[] = [];
      for(let allergen of Object.keys(this.allergens.controls)) {
        if(this.allergens.get(allergen)?.value) {
          allergenArray.push(allergen as Allergen);
        }
      }
      if(allergenArray.length > 0) {
        this.recipe.allergens = allergenArray;
      }
      const whenArray : When[] = [];
      for(let when of Object.keys(this.whens.controls)) {
        if(this.whens.get(when)?.value) {
          whenArray.push(when as When);
        }
      }
      if(whenArray.length > 0) {
        this.recipe.when = whenArray;
      }
      const labelArray : Label[] = [];
      for(let label of Object.keys(this.labels.controls)) {
        if(this.labels.get(label)?.value) {
          labelArray.push(label as Label);
        }
      }
      if(labelArray.length > 0) {
        this.recipe.labels = labelArray;
      }

      const prep = this.recipeForm.get('preparationTime')?.get('preparation')?.value;
      if(prep != null && prep != 0) this.recipe.preparationTime.preparation = prep;
      const owen = this.recipeForm.get('preparationTime')?.get('owen')?.value;
      if(owen != null && owen != 0) this.recipe.preparationTime.owen = owen;
      const cooking = this.recipeForm.get('preparationTime')?.get('cooking')?.value;
      if(cooking != null && cooking != 0) this.recipe.preparationTime.cooking = cooking;
      const total = this.recipeForm.get('preparationTime')?.get('total')?.value;
      if(total != null && total != 0) this.recipe.preparationTime.total = total;

      const ingredients : IngredientSection[] = this.ingredients.value;
      if(ingredients.length > 0) {
        const ingredientSectionList : IngredientSection[] = [];
        for(let sect of ingredients) {
          const ingredientSection: IngredientSection = {
            section: sect.section,
            ingredients: [...sect.ingredients.filter(i => i.name != '')]
          }
          ingredientSectionList.push(ingredientSection);
        }
        this.recipe.ingredients = ingredientSectionList;
      }

      const dirs = this.directions.value;
      if(dirs.length > 0) {
        this.recipe.directions = dirs;
      }
    }
  }
}
