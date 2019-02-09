import { TestBed } from '@angular/core/testing';

import { AdmhubService } from './admhub.service';

describe('AdmhubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmhubService = TestBed.get(AdmhubService);
    expect(service).toBeTruthy();
  });
});
