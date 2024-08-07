import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSiteFooterComponent } from './c-site-footer.component';

describe('CSiteFooterComponent', () => {
  let component: CSiteFooterComponent;
  let fixture: ComponentFixture<CSiteFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSiteFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CSiteFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
