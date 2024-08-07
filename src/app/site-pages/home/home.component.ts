import { Component, Input, booleanAttribute } from '@angular/core';
import { SiteBaseTemplateComponent } from '../site-base-template/site-base-template.component';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [SiteBaseTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
