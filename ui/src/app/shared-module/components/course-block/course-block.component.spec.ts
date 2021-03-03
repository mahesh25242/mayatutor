import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseBlockComponent } from './course-block.component';

describe('CourseBlockComponent', () => {
  let component: CourseBlockComponent;
  let fixture: ComponentFixture<CourseBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
