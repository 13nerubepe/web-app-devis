import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestokagesComponent } from './destockages.component';

describe('DestokagesComponent', () => {
  let component: DestokagesComponent;
  let fixture: ComponentFixture<DestokagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestokagesComponent]
    });
    fixture = TestBed.createComponent(DestokagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
