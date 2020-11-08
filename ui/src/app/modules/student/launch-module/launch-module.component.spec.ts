import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchModuleComponent } from './launch-module.component';

describe('LaunchModuleComponent', () => {
  let component: LaunchModuleComponent;
  let fixture: ComponentFixture<LaunchModuleComponent>;

  beforeEach(async(() => {
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
