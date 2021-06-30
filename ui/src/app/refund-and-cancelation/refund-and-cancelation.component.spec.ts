import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundAndCancelationComponent } from './refund-and-cancelation.component';

describe('RefundAndCancelationComponent', () => {
  let component: RefundAndCancelationComponent;
  let fixture: ComponentFixture<RefundAndCancelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundAndCancelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundAndCancelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
