import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LaunchModuleComponent } from './launch-module.component';

describe('LaunchModuleComponent', () => {
  let component: LaunchModuleComponent;
  let fixture: ComponentFixture<LaunchModuleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
