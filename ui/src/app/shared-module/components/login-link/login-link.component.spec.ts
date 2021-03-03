import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginLinkComponent } from './login-link.component';

describe('LoginLinkComponent', () => {
  let component: LoginLinkComponent;
  let fixture: ComponentFixture<LoginLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
