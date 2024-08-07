import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformasComponent } from './proformas.component';

describe('ProformasComponent', () => {
  let component: ProformasComponent;
  let fixture: ComponentFixture<ProformasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProformasComponent]
    });
    fixture = TestBed.createComponent(ProformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
