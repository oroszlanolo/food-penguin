import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RecipeViewComponent } from './recipe-view.component';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';


describe('RecipeViewComponent', () => {
  let component: RecipeViewComponent;
  let fixture: ComponentFixture<RecipeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RecipeViewComponent],
    providers: [
      provideRouter([]),
      provideToastr()
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(RecipeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
