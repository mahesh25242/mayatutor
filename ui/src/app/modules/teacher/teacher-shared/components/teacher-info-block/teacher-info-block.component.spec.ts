import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherInfoBlockComponent } from './teacher-info-block.component';

describe('TeacherInfoBlockComponent', () => {
  let component: TeacherInfoBlockComponent;
  let fixture: ComponentFixture<TeacherInfoBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInfoBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
