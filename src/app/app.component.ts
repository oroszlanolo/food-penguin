import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Event, NavigationEnd} from '@angular/router';

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
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FoodPenguin';
  navigationItems = navBar;
  path = "";
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
        this.path = this.location.path(true);
      }

  });
  }

  ngOnInit(): void {
    this.path = this.location.path(true);
  }

}
