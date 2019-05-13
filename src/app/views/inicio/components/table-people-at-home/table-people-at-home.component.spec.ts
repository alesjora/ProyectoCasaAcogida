import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePeopleAtHomeComponent } from './table-people-at-home.component';

describe('TablePeopleAtHomeComponent', () => {
  let component: TablePeopleAtHomeComponent;
  let fixture: ComponentFixture<TablePeopleAtHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePeopleAtHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePeopleAtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
