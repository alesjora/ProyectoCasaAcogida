import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalLegalComponent } from './legal-legal.component';

describe('LegalLegalComponent', () => {
  let component: LegalLegalComponent;
  let fixture: ComponentFixture<LegalLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
