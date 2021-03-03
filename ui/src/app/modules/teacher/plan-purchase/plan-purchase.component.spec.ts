import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlanPurchaseComponent } from './plan-purchase.component';

describe('PlanPurchaseComponent', () => {
  let component: PlanPurchaseComponent;
  let fixture: ComponentFixture<PlanPurchaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
