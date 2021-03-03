import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListTeachersComponent } from './list-teachers.component';

describe('ListTeachersComponent', () => {
  let component: ListTeachersComponent;
  let fixture: ComponentFixture<ListTeachersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
