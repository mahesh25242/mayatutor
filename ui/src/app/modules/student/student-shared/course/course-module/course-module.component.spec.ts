import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseModuleComponent } from './course-module.component';

describe('CourseModuleComponent', () => {
  let component: CourseModuleComponent;
  let fixture: ComponentFixture<CourseModuleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
