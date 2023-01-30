import { TestBed } from '@angular/core/testing';

import { EditproductService } from './editproduct.service';

describe('EditproductService', () => {
  let service: EditproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
