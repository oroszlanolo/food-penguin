import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Recipe } from 'src/recipe';
import { environment } from 'src/environments/environment';
import { NgFor, NgIf, TitleCasePipe, ViewportScroller } from '@angular/common';
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
  pageSize = 9;
  recipes = signal<Recipe[]>([]);
  page = signal(1);
  totalPages = signal(0);
  loading = signal(false);
  hasPrev = computed(() => this.page() > 1);
  hasNext = computed(() => this.page() < this.totalPages());
  constructor(private foodService: FoodService, private scroller: ViewportScroller) {}

  ngOnInit(): void {
    this.updateRecipes();
  }
  onSearch(searchText: string) {
    this.foodService.searchForRecipe(searchText).subscribe(recipes => this.recipes.set(recipes));
  }

  next() {
    if(this.hasNext() && !this.loading()) {
      this.page.update(p => p + 1);
      this.updateRecipes();
      this.scroller.scrollToPosition([0, 0]);
    }
  }
  prev() {
    if(this.hasPrev() && !this.loading()) {
      this.page.update(p => p - 1);
      this.updateRecipes();
      this.scroller.scrollToPosition([0, 0]);
    }
  }

  private updateRecipes() {
    this.loading.set(true);
    this.foodService.getRecipes(this.page(), this.pageSize).subscribe(res => {
      this.loading.set(false);
      this.recipes.set(res.recipes.data);
      this.totalPages.set(res.recipes.metadata.totalPages);
    });
  }
}
