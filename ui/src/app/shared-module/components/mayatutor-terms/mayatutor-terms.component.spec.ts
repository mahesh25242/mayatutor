import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MayatutorTermsComponent } from './mayatutor-terms.component';

describe('MayatutorTermsComponent', () => {
  let component: MayatutorTermsComponent;
  let fixture: ComponentFixture<MayatutorTermsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MayatutorTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayatutorTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
