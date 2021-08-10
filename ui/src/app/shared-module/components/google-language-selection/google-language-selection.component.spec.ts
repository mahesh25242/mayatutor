import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoogleLanguageSelectionComponent } from './google-language-selection.component';

describe('GoogleLanguageSelectionComponent', () => {
  let component: GoogleLanguageSelectionComponent;
  let fixture: ComponentFixture<GoogleLanguageSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleLanguageSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleLanguageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
