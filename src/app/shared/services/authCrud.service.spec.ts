import { TestBed } from '@angular/core/testing';

import { AuthCrudService } from './authCrud.service';

describe('AuthService', () => {
  let service: AuthCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
