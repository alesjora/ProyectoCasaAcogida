import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOcupationComponent } from './show-ocupation.component';

describe('ShowOcupationComponent', () => {
  let component: ShowOcupationComponent;
  let fixture: ComponentFixture<ShowOcupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOcupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOcupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
