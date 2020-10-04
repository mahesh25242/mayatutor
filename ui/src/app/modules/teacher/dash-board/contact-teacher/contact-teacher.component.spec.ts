import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTeacherComponent } from './contact-teacher.component';

describe('ContactTeacherComponent', () => {
  let component: ContactTeacherComponent;
  let fixture: ComponentFixture<ContactTeacherComponent>;

  beforeEach(async(() => {
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
