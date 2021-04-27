import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpVideoComponent } from './help-video.component';

describe('HelpVideoComponent', () => {
  let component: HelpVideoComponent;
  let fixture: ComponentFixture<HelpVideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
