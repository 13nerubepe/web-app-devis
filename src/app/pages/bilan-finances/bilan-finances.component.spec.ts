import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BilanFinancesComponent } from './bilan-finances.component';

describe('BilanFinancesComponent', () => {
  let component: BilanFinancesComponent;
  let fixture: ComponentFixture<BilanFinancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BilanFinancesComponent]
    });
    fixture = TestBed.createComponent(BilanFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
