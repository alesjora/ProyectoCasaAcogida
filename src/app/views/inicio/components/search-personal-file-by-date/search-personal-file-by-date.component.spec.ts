import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonalFileByDateComponent } from './search-personal-file-by-date.component';

describe('SearchPersonalFileByDateComponent', () => {
  let component: SearchPersonalFileByDateComponent;
  let fixture: ComponentFixture<SearchPersonalFileByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPersonalFileByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonalFileByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
