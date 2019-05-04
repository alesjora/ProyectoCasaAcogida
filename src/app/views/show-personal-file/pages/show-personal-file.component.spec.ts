import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonalFileComponent } from './show-personal-file.component';

describe('ShowPersonalFileComponent', () => {
  let component: ShowPersonalFileComponent;
  let fixture: ComponentFixture<ShowPersonalFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPersonalFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPersonalFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
