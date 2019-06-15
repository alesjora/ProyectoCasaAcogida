import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryBetweenDateComponent } from './entry-between-date.component';

describe('EntryBetweenDateComponent', () => {
  let component: EntryBetweenDateComponent;
  let fixture: ComponentFixture<EntryBetweenDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryBetweenDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryBetweenDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
