import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReplyMailComponent } from './reply-mail.component';

describe('ReplyMailComponent', () => {
  let component: ReplyMailComponent;
  let fixture: ComponentFixture<ReplyMailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
