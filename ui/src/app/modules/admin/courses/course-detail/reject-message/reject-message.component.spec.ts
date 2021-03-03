import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejectMessageComponent } from './reject-message.component';

describe('RejectMessageComponent', () => {
  let component: RejectMessageComponent;
  let fixture: ComponentFixture<RejectMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
