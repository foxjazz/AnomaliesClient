import { TestBed } from '@angular/core/testing';

import { AdmchatService } from './admchat.service';

describe('AdmchatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmchatService = TestBed.get(AdmchatService);
    expect(service).toBeTruthy();
  });
});
