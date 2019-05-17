import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HateCrimesComponent } from './hate-crimes.component';

describe('HateCrimesComponent', () => {
  let component: HateCrimesComponent;
  let fixture: ComponentFixture<HateCrimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HateCrimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HateCrimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
