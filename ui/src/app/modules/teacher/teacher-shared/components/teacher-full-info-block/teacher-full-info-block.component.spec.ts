import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFullInfoBlockComponent } from './teacher-full-info-block.component';

describe('TeacherFullInfoBlockComponent', () => {
  let component: TeacherFullInfoBlockComponent;
  let fixture: ComponentFixture<TeacherFullInfoBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFullInfoBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFullInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
