import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureDialogComponent } from './departure-dialog.component';

describe('DepartureDialogComponent', () => {
  let component: DepartureDialogComponent;
  let fixture: ComponentFixture<DepartureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
