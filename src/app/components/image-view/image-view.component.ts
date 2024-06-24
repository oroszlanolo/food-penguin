import { Component, computed, input, numberAttribute, output, signal } from '@angular/core';
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
  selectedIdx = signal(0);
  image = computed(() => this.images()[this.selectedIdx()]);
  imageCount = computed(() => this.images().length);
  hasPrev = computed(() => this.selectedIdx() > 0);
  hasNext = computed(() => this.selectedIdx() < this.images().length - 1);

  getImgString(img: string, full = false) {
    return `${this.recipeServerUrl}api/image?id=${img}&size=${full ? 'large' : 'small'}`;
  }

  next() {
    if(this.hasNext()) {
      this.selectedIdx.update(i => i + 1);
    }
  }
  prev() {
    if(this.hasPrev()) {
      this.selectedIdx.update(i => i - 1);
    }
  }
  changeTo(idx: number) {
    if(idx >= 0 && idx < this.imageCount()) {
      this.selectedIdx.set(idx);
    }
  }
  close() {
    this.closeImageView.emit();
  }
}
