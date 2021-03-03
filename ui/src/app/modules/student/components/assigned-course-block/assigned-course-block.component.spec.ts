import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignedCourseBlockComponent } from './assigned-course-block.component';

describe('AssignedCourseBlockComponent', () => {
  let component: AssignedCourseBlockComponent;
  let fixture: ComponentFixture<AssignedCourseBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedCourseBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedCourseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
