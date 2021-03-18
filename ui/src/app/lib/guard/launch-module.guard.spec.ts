import { TestBed } from '@angular/core/testing';

import { LaunchModuleGuard } from './launch-module.guard';

describe('LaunchModuleGuard', () => {
  let guard: LaunchModuleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LaunchModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
