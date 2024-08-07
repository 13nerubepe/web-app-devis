import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDevisComponent } from './header-devis.component';

describe('HeaderDevisComponent', () => {
  let component: HeaderDevisComponent;
  let fixture: ComponentFixture<HeaderDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
