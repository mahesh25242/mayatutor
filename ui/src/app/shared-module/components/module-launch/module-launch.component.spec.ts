import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModuleLaunchComponent } from './module-launch.component';

describe('ModuleLaunchComponent', () => {
  let component: ModuleLaunchComponent;
  let fixture: ComponentFixture<ModuleLaunchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
