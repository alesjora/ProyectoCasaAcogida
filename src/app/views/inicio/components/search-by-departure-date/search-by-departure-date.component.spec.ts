import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDepartureDateComponent } from './search-by-departure-date.component';

describe('SearchByDepartureDateComponent', () => {
  let component: SearchByDepartureDateComponent;
  let fixture: ComponentFixture<SearchByDepartureDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByDepartureDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDepartureDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
