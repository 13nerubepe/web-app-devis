import { Component, Input, OnInit } from '@angular/core';
import { topcard } from './top-cards-data';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  @Input() data: any[] = [];
  topcards: topcard[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.topcards = this.data;
  }

}
