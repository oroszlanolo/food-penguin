import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { DishTypePipe } from './pipes/dish-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipesComponent,
    RecipeSearchComponent,
    RecipeViewComponent,
    NewRecipeComponent,
    EditRecipeComponent,
    ShoppingListComponent,
    DishTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
