import { Component } from '@angular/core';
import { CSiteFooterComponent } from 'src/app/component/c-site-footer/c-site-footer.component';
import { CSiteSliderComponent } from 'src/app/component/c-site-slider/c-site-slider.component';
import { CSiteTopMenuComponent } from 'src/app/component/c-site-top-menu/c-site-top-menu.component';

@Component({
  selector: 'page-site-base-template',
  standalone: true,
  imports: [
    CSiteTopMenuComponent, 
    CSiteSliderComponent, 
    CSiteFooterComponent
  ],
  templateUrl: './site-base-template.component.html',
  styleUrl: './site-base-template.component.scss'
})
export class SiteBaseTemplateComponent {
  topMenuBackgroundTransparent = true;
}
