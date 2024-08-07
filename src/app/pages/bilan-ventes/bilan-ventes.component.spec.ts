import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanVenteComponent } from './bilan-ventes.component';

describe('BilanVenteComponent', () => {
  let component: BilanVenteComponent;
  let fixture: ComponentFixture<BilanVenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BilanVenteComponent]
    });
    fixture = TestBed.createComponent(BilanVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
