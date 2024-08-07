import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDevisComponent } from './footer-devis.component';

describe('FooterDevisComponent', () => {
  let component: FooterDevisComponent;
  let fixture: ComponentFixture<FooterDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterDevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
