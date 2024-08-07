import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointVentesComponent } from './point-ventes.component';

describe('PointVentesComponent', () => {
  let component: PointVentesComponent;
  let fixture: ComponentFixture<PointVentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointVentesComponent]
    });
    fixture = TestBed.createComponent(PointVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
