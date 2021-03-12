import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactTeacherComponent } from './contact-teacher.component';

describe('ContactTeacherComponent', () => {
  let component: ContactTeacherComponent;
  let fixture: ComponentFixture<ContactTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
