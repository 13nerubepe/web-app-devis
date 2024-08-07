
import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Product, TopSelling } from "../../classes/table-data";

@Component({
  selector: 'app-footer-devis',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './footer-devis.component.html',
  styleUrl: './footer-devis.component.scss'
})
export class FooterDevisComponent {
  topSelling: Product[];
  constructor() {

    this.topSelling = TopSelling;
  }

}
