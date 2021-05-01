import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomeVideoComponent } from './edit-home-video.component';

describe('EditHomeVideoComponent', () => {
  let component: EditHomeVideoComponent;
  let fixture: ComponentFixture<EditHomeVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHomeVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
