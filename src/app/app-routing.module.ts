import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "recipes", component: RecipesComponent },
  { path: "recipe/:id", component: RecipeViewComponent },
  { path: "add-new", component: NewRecipeComponent },
  { path: "edit", component: EditRecipeComponent },
  { path: "shopping-list", component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
