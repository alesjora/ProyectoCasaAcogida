import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonalFileComponent } from './search-personal-file.component';

describe('SearchPersonalFileComponent', () => {
  let component: SearchPersonalFileComponent;
  let fixture: ComponentFixture<SearchPersonalFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPersonalFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonalFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
