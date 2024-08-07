import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSiteTopMenuComponent } from './c-site-top-menu.component';

describe('CSiteTopMenuComponent', () => {
  let component: CSiteTopMenuComponent;
  let fixture: ComponentFixture<CSiteTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSiteTopMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CSiteTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
