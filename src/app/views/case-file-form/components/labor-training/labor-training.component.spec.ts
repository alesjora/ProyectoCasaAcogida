import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborTrainingComponent } from './labor-training.component';

describe('LaborTrainingComponent', () => {
  let component: LaborTrainingComponent;
  let fixture: ComponentFixture<LaborTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
