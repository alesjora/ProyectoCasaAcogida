import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderViolenceComponent } from './gender-violence.component';

describe('GenderViolenceComponent', () => {
  let component: GenderViolenceComponent;
  let fixture: ComponentFixture<GenderViolenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderViolenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderViolenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
