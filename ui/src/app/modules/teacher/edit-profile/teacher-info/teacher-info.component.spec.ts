import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherInfoComponent } from './teacher-info.component';

describe('TeacherInfoComponent', () => {
  let component: TeacherInfoComponent;
  let fixture: ComponentFixture<TeacherInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
