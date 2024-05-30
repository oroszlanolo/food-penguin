import { Component, OnInit } from '@angular/core';
import { Location, NgFor, NgClass } from '@angular/common';
import { Router, Event, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./components/login/login.component";
import { UserService } from './services/user.service';

const navBar = [
  {ref: "/home", title: "Home"},
  {ref: "/recipes", title: "Recipes"},
  {ref: "/add-new", title: "Add New"},
  {ref: "/categories", title: "Categories"},
  {ref: "/week-plan", title: "Week Planner"},
  {ref: "/empty-the-fridge", title: "Empty my Fridge"},
  {ref: "/shopping-list", title: "Shopping List"},
]

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [FormsModule, RouterLink, NgFor, NgClass, RouterOutlet, LoginComponent]
})
export class AppComponent implements OnInit{
  navigationItems = navBar;
  path = "";
  menuOpen = false;

  get loggedIn() {
    return this.userService.loggedIn;
  }

  constructor(private router: Router, private location: Location, private userService: UserService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
        this.path = this.location.path(true);
        this.menuOpen = false;
      }

  });
  }

  ngOnInit(): void {
    this.path = this.location.path(true);
  }

}
