import { Component } from '@angular/core';
import { RecipeStripComponent } from "./recipe-strip/recipe-strip.component";
import { HomeType } from 'src/app/services/food.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [RecipeStripComponent]
})
export class HomeComponent {
    homeStrips : {title: string, type: HomeType}[] = [
        {title: 'Popular recipes', type: 'popular'},
        {title: 'Latest recipes', type: 'latest'},
        {title: 'Random recipes', type: 'random'},
        {title: 'Maybe forgotten recipes', type: 'unpopular'},
    ];

    constructor() {
        const savedStrips = localStorage.getItem('homeStrips');
        if(savedStrips) {
            this.homeStrips = JSON.parse(savedStrips);
        } else {
            this.cacheStrips();
        }
    }

    moveUp(n: number) {
        if(n > 0) {
            const item = this.homeStrips.splice(n, 1)[0];
            this.homeStrips.splice(n - 1, 0, item);
            this.cacheStrips();
        }
    }
    moveDown(n: number) {
        if(n < this.homeStrips.length - 1) {
            const item = this.homeStrips.splice(n, 1)[0];
            this.homeStrips.splice(n + 1, 0, item);
            this.cacheStrips();
        }
    }

    private cacheStrips() {
        localStorage.setItem('homeStrips', JSON.stringify(this.homeStrips));
    }
}
