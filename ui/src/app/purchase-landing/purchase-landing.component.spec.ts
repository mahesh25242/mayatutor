import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseLandingComponent } from './purchase-landing.component';

describe('PurchaseLandingComponent', () => {
  let component: PurchaseLandingComponent;
  let fixture: ComponentFixture<PurchaseLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
