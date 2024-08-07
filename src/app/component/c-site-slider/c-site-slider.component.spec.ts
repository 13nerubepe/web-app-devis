import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSiteSliderComponent } from './c-site-slider.component';

describe('CSiteSliderComponent', () => {
  let component: CSiteSliderComponent;
  let fixture: ComponentFixture<CSiteSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSiteSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CSiteSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
