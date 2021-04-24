import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInvoicesComponent } from './teacher-invoices.component';

describe('TeacherInvoicesComponent', () => {
  let component: TeacherInvoicesComponent;
  let fixture: ComponentFixture<TeacherInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
