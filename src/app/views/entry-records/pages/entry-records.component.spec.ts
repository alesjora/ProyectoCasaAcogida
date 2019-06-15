import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRecordsComponent } from './entry-records.component';

describe('EntryRecordsComponent', () => {
  let component: EntryRecordsComponent;
  let fixture: ComponentFixture<EntryRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
