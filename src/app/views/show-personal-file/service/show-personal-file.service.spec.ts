import { TestBed } from '@angular/core/testing';

import { ShowPersonalFileService } from './show-personal-file.service';

describe('ShowPersonalFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowPersonalFileService = TestBed.get(ShowPersonalFileService);
    expect(service).toBeTruthy();
  });
});
