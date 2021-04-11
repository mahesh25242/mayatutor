import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeacherReportAbuseComponent } from './teacher-report-abuse.component';

describe('TeacherReportAbuseComponent', () => {
  let component: TeacherReportAbuseComponent;
  let fixture: ComponentFixture<TeacherReportAbuseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherReportAbuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReportAbuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
