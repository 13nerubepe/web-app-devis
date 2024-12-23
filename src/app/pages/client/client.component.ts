import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';
import { Client } from "../../classes/table-data";
import { ProformasService } from "../../service/proformas.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientComponent implements OnInit {
  [x: string]: any;
  clients: Client[] = [];
  allClients: Client[] = [];
  pves: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  client: any = {};
  pv: any = {};
  sModelName = 'user';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  mpForm!: FormGroup;
  user: any;

  grades = [
    { titre: "Administrateur", value: 50 },
    { titre: "Directeur des études", value: 40 },
    { titre: "Chef de pv", value: 35 },
    { titre: "Comptable", value: 30 },
    { titre: "Surveillant Général", value: 20 },
    { titre: "Censeur", value: 10 },
    { titre: "Client", value: 0 },
  ];

  constructor(
    private  proformaService:ProformasService,
    private dataRestService: DataRestService,
    private modalService: NgbModal
  ) {
    this.pv = this.dataRestService.getOneLocalData("pv");
  }

  ngOnInit(): void {
    // this.user = this.dataRestService.getOneLocalData("user");
    this.getClients();
  }

  ngAfterViewInit(): void {
    this.loadData();
  }
  getClients(){
    this.proformaService.getValuesClient().subscribe({
      next:(value)=>{
        this.allClients=value;
        console.log("valaue clients:", value);
      }
    })
  }

  loadData() {
    this.loading = true;
    combineLatest(
      this.dataRestService.getAll('pointvente', false, this.sModelName),
    ).pipe(map(([clients]: any[]) => {
      this.allClients = clients;
      this.changeClient();
    },
      (err: any) => {
        const message = "Une erreur s'est produite. \n" + (err.message || '');
        Swal.fire(message, '', 'error').then();
      }
    )).subscribe(() => { }, (err) => { });
  }

  changeClient() {
    this.allClients = this.allClients.filter((user: any) => parseInt(user.grade, 10) === 0 && user.pointvente.id === parseInt(this.pv.id, 10));
    this.clients = this.allClients.map((u: any) => { return { ...u, ...{ poste: this.grades.find((g: any) => g.value === parseInt(u.grade, 10))?.titre } } });
    this.loading = false;
  }
}
