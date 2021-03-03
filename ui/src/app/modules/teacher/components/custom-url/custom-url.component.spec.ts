import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomUrlComponent } from './custom-url.component';

describe('CustomUrlComponent', () => {
  let component: CustomUrlComponent;
  let fixture: ComponentFixture<CustomUrlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
