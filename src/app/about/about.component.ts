import { Component, } from '@angular/core';
import { DataRestService } from '../service/data-rest.service';
@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(private dataRestService: DataRestService) {
  }

  ngOnInit() {
    this.dataRestService.getAll('apprenants,salles,prospects,users', false, 'pv').then((res) => console.log(res));
  }
}
