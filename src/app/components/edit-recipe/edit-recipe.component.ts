import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Allergen, Difficulty, DishType, Ingredient, Section, Label, Recipe, When, getDefaultRecipe } from 'src/recipe';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/services/image.service';
import { DishTypePipe } from '../../pipes/dish-type.pipe';
import { NgIf, NgClass, NgFor, TitleCasePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { CheckCardComponent } from "../units/check-card/check-card.component";
import { ToastrService } from 'ngx-toastr';

type Tab = 'overview' | 'ingredients' | 'directions';
@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
    styleUrls: ['./edit-recipe.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass, NgFor, TitleCasePipe, DishTypePipe, CheckCardComponent]
})
export class EditRecipeComponent implements OnInit{
  recipeServerUrl = environment.serverPath;
  url = '';
  id = '';
  recipe? : Recipe;
  object = Object;
  activeTab : Tab = 'overview'
  sectionId = 2;
  editingExistingRecipe = false;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private foodService : FoodService,
    private imgService: ImageService,
    private fb: FormBuilder,
    private user: UserService,
    private toastr: ToastrService) {}

  get loggedIn(){
    return this.user.loggedIn;
  }
  recipeForm = this.fb.group({
    name: ['', Validators.required],
    serving: [0, Validators.required],
    difficulty: 0,
    dishType: this.fb.group({ main_dish: false, soup: false, dessert: false, garnish: false, drink: false, cold_appetizer: false, warm_appetizer: false, amuse_bouche: false, other_course: false, }),
    when: this.fb.group({ breakfast: false, lunch: false, dinner: false, snack: false, always: false }),
    preparationTime: this.fb.group({
      preparation: 0,
      owen: 0,
      cooking: 0,
      total: [{value: 0, disabled: true}],
    }),
    allergens: this.fb.group({ "gluten-free": false, "sugar-free": false, "lactose-free": false, "dairy-free": false, "egg-free": false, }),
    labels: this.fb.group({
      cheap: false,
      vegan: false
    }),
    sections:this.fb.array([
      this.fb.group({
        name: 'Main',
        ingredients: this.fb.array([]),
        directions: this.fb.array([])
      })
    ])
  });

  difficultyTexts = ['Easy','Intermediate','Expert'];

  get difficulty() {
    return this.recipeForm.get('difficulty')?.value ?? 0;
  }
  get sections() {
    return this.recipeForm.get('sections') as FormArray;
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

  getIngredientsFromSection(section : AbstractControl<any, any>) {
    return section.get('ingredients') as FormArray;
  }

  getDirectionsFromSection(section : AbstractControl<any, any>) {
    return section.get('directions') as FormArray;
  }

  addSection() {
    this.sections.push(this.fb.group({
      name: `section-${this.sectionId}`,
      ingredients: this.fb.array([]),
      directions: this.fb.array([])
    }))
    this.sectionId++;
  }
  
  removeSection(sectionName: string) {
    const idx = this.sections.controls.findIndex(c => c.get('name')?.value === sectionName);
    this.sections.removeAt(idx);
  }

  getSection(sectionName: string) : AbstractControl<any, any> | null {
    const section = this.sections.controls.filter(c => c.get('name')?.value === sectionName)[0];
    if(!section) {
      console.log(`Could not find section with name ${sectionName}`);
      return null;
    }
    return section;
  }

  addIngredient(sectionName: string, name = '', quantity = 0, unit = '', note = '') {
    const section = this.getSection(sectionName);
    if(!section) return;
    const iArray = this.getIngredientsFromSection(section);
    if(iArray) {
      iArray.push(this.fb.group({
        quantity: quantity,
        unit: unit,
        name: name,
        note: note
      }));
    }
  }

  removeIngredient(sectionName: string, ingredientIdx: number) {
    console.log(sectionName, ingredientIdx);
    const section = this.getSection(sectionName);
    if(!section) return;
    const iArray = this.getIngredientsFromSection(section);
    if(iArray) {
      iArray.removeAt(ingredientIdx);
    }
    console.log(iArray);
  }

  addDirection(sectionName: string, dir: string = '') {
    const section = this.getSection(sectionName);
    if(!section) return;
    const dArray = this.getDirectionsFromSection(section);
    if(dArray) {
      dArray.push(this.fb.control(dir));
    }
  }
  removeDirection(sectionName: string, i : number) {
    const section = this.getSection(sectionName);
    if(!section) return;
    const dArray = this.getDirectionsFromSection(section);
    if(dArray) {
      dArray.removeAt(i);
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if(window.history.state?.recipe) {
      this.recipe = window.history.state.recipe;
      this.#updateRecipeForm();
    }
    if(window.history.state?.editingExistingRecipe) {
      this.editingExistingRecipe = true;
    }
    if(window.history.state?.url) {
      this.url = window.history.state.url;
    }

    if(this.id !== '' && !this.recipe) {
      this.foodService.getRecipe(this.id).subscribe(recipe => {
        this.recipe = recipe;
        this.#updateRecipeForm();
      })
    }
    if(this.recipe?._id) {
      this.id = this.recipe?._id;
    }

    if(!this.recipe) {
      this.recipe = getDefaultRecipe();
      this.#updateRecipeForm();
    }
  }

  addRecipe() {
    console.log(this.recipe);
    if(this.recipe) {
      this.foodService.addOrUpdateRecipe(this.recipe).subscribe({
        next: (id) => {
          console.log('id', id);
          this.toastr.success(`Recipe ${this.editingExistingRecipe ? 'updated' : 'added'}`);
          this.router.navigate([`/recipe/${id}`]);
        },
        error: err => console.log(err)
      });
    }
  }

  addImg(event : Event) {
    this.imgService.addImage(event).subscribe(resp => {
      console.log(resp);
      this.recipe?.images.push(resp);
      console.log(this.recipe);
    });
  }

  validateRecipe(): boolean {
    return true; // TODO
  }

  onSubmit() {
    this.#updateRecipeFromForm();
    console.log(this.recipe);
    this.addRecipe();
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

      for(let i = 0; i < this.recipe.sections.length; i++) {
        const section = this.recipe.sections[i];
        if(i > 0)
          this.addSection();
        this.sections.controls[i].get('name')?.setValue(section.name);
        const sectionName = this.sections.controls[i].get('name')!.value;
        for(let ingredient of section.ingredients) {
          this.addIngredient(sectionName, ingredient.name, ingredient.quantity, ingredient.unit, ingredient.note);
        }
        for(let direction of section.directions) {
          this.addDirection(sectionName, direction);
        }
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
      console.log(this.allergens);
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

      const sections : Section[] = this.sections.value;
      this.recipe.sections = sections;
    }
  }
}
