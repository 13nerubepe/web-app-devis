import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriquesComponent } from './rubriques.component';

describe('RubriquesComponent', () => {
  let component: RubriquesComponent;
  let fixture: ComponentFixture<RubriquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RubriquesComponent]
    });
    fixture = TestBed.createComponent(RubriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
