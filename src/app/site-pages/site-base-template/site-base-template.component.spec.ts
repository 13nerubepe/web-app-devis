import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBaseTemplateComponent } from './site-base-template.component';

describe('SiteBaseTemplateComponent', () => {
  let component: SiteBaseTemplateComponent;
  let fixture: ComponentFixture<SiteBaseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteBaseTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteBaseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
