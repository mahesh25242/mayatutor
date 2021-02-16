import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLaunchComponent } from './module-launch.component';

describe('ModuleLaunchComponent', () => {
  let component: ModuleLaunchComponent;
  let fixture: ComponentFixture<ModuleLaunchComponent>;

  beforeEach(async(() => {
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
