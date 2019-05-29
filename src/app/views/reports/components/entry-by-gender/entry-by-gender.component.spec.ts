import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryByGenderComponent } from './entry-by-gender.component';

describe('EntryByGenderComponent', () => {
  let component: EntryByGenderComponent;
  let fixture: ComponentFixture<EntryByGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryByGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryByGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
