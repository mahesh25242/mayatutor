import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBannerComponent } from './home-page-banner.component';

describe('HomePageBannerComponent', () => {
  let component: HomePageBannerComponent;
  let fixture: ComponentFixture<HomePageBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
