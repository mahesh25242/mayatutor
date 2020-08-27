import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyMailComponent } from './reply-mail.component';

describe('ReplyMailComponent', () => {
  let component: ReplyMailComponent;
  let fixture: ComponentFixture<ReplyMailComponent>;

  beforeEach(async(() => {
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
