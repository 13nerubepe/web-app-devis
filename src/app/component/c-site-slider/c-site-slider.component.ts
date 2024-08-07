import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'c-site-slider',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './c-site-slider.component.html',
  styleUrl: './c-site-slider.component.scss'
})

export class CSiteSliderComponent {
  id = Math.round(Math.random()*10000);
  @Input() withNav?: boolean;
  @Input() withIndicator?: boolean;
  @Input({required: true}) elements: SliderElement[] = [];
}


class SliderElement {
  imageSource: string = "";
  imageAlt: string = "";
  title: any = "";
  description: any = "";
  buttons: SlideButton[] = [];
}
interface SlideButton {
  text: any;
  link: string;
  className: string;
}