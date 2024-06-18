import { Component, computed, input, numberAttribute, output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-view',
  standalone: true,
  imports: [],
  templateUrl: './image-view.component.html',
  styleUrl: './image-view.component.css'
})
export class ImageViewComponent {
  recipeServerUrl = environment.serverPath;
  images = input.required<string[]>();
  closeImageView = output<void>();
  selectedIdx = 0;
  get image() {
    return this.images()[this.selectedIdx];
  }
  imageCount = computed(() => this.images().length);
  get hasPrev() {
    return this.selectedIdx > 0;
  }
  get hasNext() {
    return this.selectedIdx < this.imageCount() - 1;
  }

  getImgString(img: string, full = false) {
    return `${this.recipeServerUrl}api/image?id=${img}&size=${full ? 'large' : 'small'}`;
  }

  next() {
    if(this.hasNext) {
      this.selectedIdx++;
    }
  }
  prev() {
    if(this.hasPrev) {
      this.selectedIdx--;
    }
  }
  changeTo(idx: number) {
    if(idx >= 0 && idx < this.imageCount()) {
      this.selectedIdx = idx;
      console.log(idx);
    }
  }
  close() {
    this.closeImageView.emit();
  }
}
