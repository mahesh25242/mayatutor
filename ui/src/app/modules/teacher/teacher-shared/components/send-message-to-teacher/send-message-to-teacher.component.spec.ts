import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageToTeacherComponent } from './send-message-to-teacher.component';

describe('SendMessageToTeacherComponent', () => {
  let component: SendMessageToTeacherComponent;
  let fixture: ComponentFixture<SendMessageToTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessageToTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessageToTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
