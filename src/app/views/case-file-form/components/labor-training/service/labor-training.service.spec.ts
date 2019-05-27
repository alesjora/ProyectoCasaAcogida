import { TestBed } from '@angular/core/testing';

import { LaborTrainingService } from './labor-training.service';

describe('LaborTrainingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaborTrainingService = TestBed.get(LaborTrainingService);
    expect(service).toBeTruthy();
  });
});
