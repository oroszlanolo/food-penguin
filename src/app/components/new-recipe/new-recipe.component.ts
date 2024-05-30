import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./new-recipe.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class NewRecipeComponent {
  url = '';
  loggedIn = this.userService.loggedIn;

  constructor(private router: Router, private userService: UserService) {}


  importUrl() {
    this.router.navigate(['/edit', { url: this.url }]);
  }
}
