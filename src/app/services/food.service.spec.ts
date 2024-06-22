import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FoodService } from './food.service';

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
