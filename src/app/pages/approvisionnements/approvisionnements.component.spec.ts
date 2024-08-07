import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovisionnementsComponent } from './approvisionnements.component';


describe('ApprovisionnementsComponent', () => {
  let component: ApprovisionnementsComponent;
  let fixture: ComponentFixture<ApprovisionnementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovisionnementsComponent]
    });
    fixture = TestBed.createComponent(ApprovisionnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
