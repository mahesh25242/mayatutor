import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeBannerComponent } from './change-banner.component';

describe('ChangeBannerComponent', () => {
  let component: ChangeBannerComponent;
  let fixture: ComponentFixture<ChangeBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
