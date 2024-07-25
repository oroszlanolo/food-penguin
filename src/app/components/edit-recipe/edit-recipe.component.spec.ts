import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EditRecipeComponent } from './edit-recipe.component';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';


describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      EditRecipeComponent],
    providers: [
      provideRouter([]),
      provideToastr()
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
