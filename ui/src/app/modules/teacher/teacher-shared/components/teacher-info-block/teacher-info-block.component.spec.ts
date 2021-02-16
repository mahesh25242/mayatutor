import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInfoBlockComponent } from './teacher-info-block.component';

describe('TeacherInfoBlockComponent', () => {
  let component: TeacherInfoBlockComponent;
  let fixture: ComponentFixture<TeacherInfoBlockComponent>;

  beforeEach(async(() => {
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
