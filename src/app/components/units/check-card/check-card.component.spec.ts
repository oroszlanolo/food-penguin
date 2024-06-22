import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCardComponent } from './check-card.component';

describe('CheckCardComponent', () => {
  let component: CheckCardComponent;
  let fixture: ComponentFixture<CheckCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'asd');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
