import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollectDetailComponent } from './collect-detail.component';

describe('CollectDetailComponent', () => {
  let component: CollectDetailComponent;
  let fixture: ComponentFixture<CollectDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
