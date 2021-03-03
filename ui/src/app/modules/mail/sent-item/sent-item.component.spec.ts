import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SentItemComponent } from './sent-item.component';

describe('SentItemComponent', () => {
  let component: SentItemComponent;
  let fixture: ComponentFixture<SentItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
