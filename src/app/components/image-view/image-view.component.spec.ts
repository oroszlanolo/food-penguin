import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewComponent } from './image-view.component';

describe('ImageViewComponent', () => {
  let component: ImageViewComponent;
  let fixture: ComponentFixture<ImageViewComponent>;
  let mockImages = ['a', 'b', 'c'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('images', mockImages);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the first image selected', () => {
    expect(component.selectedIdx()).toBe(0);
    expect(component.image()).toBe(mockImages[0]);
  });

  it('should be able to set the selected image', () => {
    expect(component.selectedIdx()).toBe(0);
    expect(component.image()).toBe(mockImages[0]);
    const newIdx = 1;
    component.changeTo(newIdx);
    expect(component.selectedIdx()).toBe(newIdx);
    expect(component.image()).toBe(mockImages[newIdx]);
  });

  it('should be able to go to the next image', () => {
    expect(component.selectedIdx()).toBe(0);
    expect(component.image()).toBe(mockImages[0]);
    expect(component.hasNext()).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('.btn.right-0').disabled).toBeFalsy();
    component.next();
    expect(component.selectedIdx()).toBe(1);
    expect(component.image()).toBe(mockImages[1]);
  });

  it('should not be able to go to the next image when no next image', () => {
    const lastIdx = mockImages.length - 1;
    component.changeTo(lastIdx);
    expect(component.selectedIdx()).toBe(lastIdx);
    expect(component.image()).toBe(mockImages[lastIdx]);
    expect(component.hasNext()).toBeFalsy();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.btn.right-0').disabled).toBeTruthy();
    component.next();
    expect(component.selectedIdx()).toBe(lastIdx);
    expect(component.image()).toBe(mockImages[lastIdx]);
  });

  it('should be able to go to the previous image', () => {
    component.changeTo(1);
    expect(component.selectedIdx()).toBe(1);
    expect(component.image()).toBe(mockImages[1]);
    expect(component.hasPrev()).toBeTruthy();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.btn.left-0').disabled).toBeFalsy();
    component.prev();
    expect(component.selectedIdx()).toBe(0);
    expect(component.image()).toBe(mockImages[0]);
  });
  it('should not be able to go to the prev image when no prev image', () => {
    expect(component.selectedIdx()).toBe(0);
    expect(component.image()).toBe(mockImages[0]);
    expect(component.hasPrev()).toBeFalsy();
    expect(fixture.debugElement.nativeElement.querySelector('.btn.left-0').disabled).toBeTruthy();
    component.prev();
    expect(component.selectedIdx()).toBe(0);
    expect(component.image()).toBe(mockImages[0]);
  });

  it('should return the proper imageString value', () => {
    const dummyServerUrl = 'https://proba.test.com/';
    component.recipeServerUrl = dummyServerUrl;
    const img = 'asd';
    expect(component.getImgString(img, false)).toBe(`${dummyServerUrl}api/image?id=${img}&size=small`);
    expect(component.getImgString(img, true)).toBe(`${dummyServerUrl}api/image?id=${img}&size=large`);
    expect(component.getImgString(img)).toBe(`${dummyServerUrl}api/image?id=${img}&size=small`);
  });
});
