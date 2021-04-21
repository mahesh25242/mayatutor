import { TestBed } from '@angular/core/testing';

import { AdminOrTeacherAuthGuard } from './adminOrTeacherAuth.guard';

describe('AdminOrTeacherAuthGuard', () => {
  let guard: AdminOrTeacherAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOrTeacherAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
