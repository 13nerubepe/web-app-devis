import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';

declare var $: any;

@Component({
  selector: 'app-list-point-vente',
  standalone: true,
  imports: [NgbDropdownModule, NgSelectModule, CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './list-point-vente.component.html'
})
export class ListPointVenteComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  sModelName = 'point-vente';
  @Input() pointVente: any = {};
  @Input() allPointVentes: any = [];
  @Output() continueAction: EventEmitter<any> = new EventEmitter();
  pointVentes: any[] = [];
  user: any = {};

  constructor(
    private dataRestService: DataRestService,
    private appDataStoreService: AppDataStoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.appDataStoreService.selectedPointVente.subscribe((pointVente: any) => {
      if (pointVente) {
        this.pointVente = pointVente;
      }
    });

    this.user = this.dataRestService.getOneLocalData('user');
    this.pointVente = this.dataRestService.getOneLocalData('pv');
    if (this.pointVente && this.pointVente.id) {
      this.allPointVentes = this.dataRestService.getOneLocalData('pvs');
      this.updatePointVente(this.pointVente);
    } else {
      this.loadData();
    }
  }

  ngAfterViewInit() {

  }

  loadData() {
    this.dataRestService.getAll('pointVente,user', false, 'user-point-vente').then((userPointVentes: any[]) => {
      this.allPointVentes = userPointVentes.filter((userPv: any) => userPv.user?.id === this.user?.id).map((userPv: any) => userPv.pointVente);
      this.appDataStoreService.changePointVentes(this.allPointVentes);
      this.updatePointVente(this.allPointVentes[0])
    },
      (err: any) => {
        const message = 'Une erreur s\'est produite. \n' + (err.message || '');
      })
  }

  changePointVente(item: any) {
    this.updatePointVente(item);
  }

  updatePointVente(item: any) {
    // this.pointVente = item;
    this.appDataStoreService.selectedPointVente.next(item);
    this.pointVentes = this.allPointVentes.filter((pointVente: any) => pointVente.id !== item.id);
    // this.appDataStoreService.changePointVente(item);
    this.dataRestService.setOneLocalData(item, 'pv');
    this.dataRestService.setOneLocalData(this.allPointVentes, 'pvs');
  }
}
