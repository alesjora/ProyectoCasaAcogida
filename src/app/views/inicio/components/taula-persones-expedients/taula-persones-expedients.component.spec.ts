import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaPersonesExpedientsComponent } from './taula-persones-expedients.component';

describe('TaulaPersonesExpedientsComponent', () => {
  let component: TaulaPersonesExpedientsComponent;
  let fixture: ComponentFixture<TaulaPersonesExpedientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaulaPersonesExpedientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaulaPersonesExpedientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
