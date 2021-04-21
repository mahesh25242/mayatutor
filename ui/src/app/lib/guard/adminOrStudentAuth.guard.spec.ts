import { TestBed } from '@angular/core/testing';

import { AdminOrStudentAuthGuard } from './adminOrStudentAuth.guard';

describe('AdminOrStudentAuthGuard', () => {
  let guard: AdminOrStudentAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOrStudentAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
