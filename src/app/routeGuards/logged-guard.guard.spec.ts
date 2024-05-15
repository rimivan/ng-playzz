import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedGuardGuard } from './logged-guard.guard';

describe('loggedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
