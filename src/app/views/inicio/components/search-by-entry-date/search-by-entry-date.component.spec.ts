import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByEntryDateComponent } from './search-by-entry-date.component';

describe('SearchByEntryDateComponent', () => {
  let component: SearchByEntryDateComponent;
  let fixture: ComponentFixture<SearchByEntryDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByEntryDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByEntryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
