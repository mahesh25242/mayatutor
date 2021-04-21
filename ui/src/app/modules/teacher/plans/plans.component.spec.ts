import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PlansComponent } from './plans.component';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
export class AppComponent {
  faCheck = faCheck;
  faTimes = faTimes;
}