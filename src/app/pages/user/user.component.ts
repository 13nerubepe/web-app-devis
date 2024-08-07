import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent {
  [x: string]: any;
  users: any[] = [];
  allUsers: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  user: any = {};
  pv: any = {};
  sModelName = 'user';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  mpForm!: FormGroup;

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
    private dataRestService: DataRestService,
    private modalService: NgbModal
  ) {
    this.pv = this.dataRestService.getOneLocalData("pv");
  }

  ngOnInit(): void {
    this.user = this.dataRestService.getOneLocalData("user");
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(
      this.dataRestService.getAll('pointvente', false, this.sModelName),
    ).pipe(map(([users]: any[]) => {
      this.allUsers = users;
      this.changeUser();
    },
      (err: any) => {
        const message = "Une erreur s'est produite. \n" + (err.message || '');
        Swal.fire(message, '', 'error').then();
      }
    )).subscribe(() => { }, (err) => { });
  }

  changeUser() {
    this.allUsers = this.allUsers.filter((user: any) => parseInt(user.grade, 10) > 0 && user.pointvente.id === parseInt(this.pv.id, 10));
    this.users = this.allUsers.map((u: any) => { return { ...u, ...{ poste: this.grades.find((g: any) => g.value === parseInt(u.grade, 10))?.titre } } });

    this.loading = false;
  }
}
