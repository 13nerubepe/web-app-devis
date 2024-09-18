import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';
import { Client } from "../../classes/table-data";
import { ProformasService } from "../../service/proformas.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{
  @Input() isClient: boolean = false;  // Indique si la liste affiche des clients ou d'autres types d'utilisateurs
  @Input() users: Client[] = [];

  [x: string]: any;


  allUsers: Client[] = [];


  usersPv: any[] = [];
  pves: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  user: any = {};
  pv: any = {};
  grade: any = {};
  sModelName = 'user';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  mpForm!: FormGroup;

  grades = [
    { titre: "Administrateur", value: 50 },
    { titre: "Chef de point de vente", value: 35 },
    { titre: "Caissier(e)", value: 30 },
    { titre: "Client", value: 0 },
  ]

  constructor(
    private proformasService: ProformasService,
    private dataRestService: DataRestService,
    private modalService: NgbModal,
    private appDataStoreService: AppDataStoreService,
  ) {
    this.pv = this.dataRestService.getOneLocalData("pv");
  }

  ngOnInit(): void {
    this.appDataStoreService.selectedPointVente.subscribe((pointVente: any) => {
      if (pointVente) {
        this.pv = pointVente;
        this.loadData();
      }
    });

    this.mpForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      fullName: new FormControl('', Validators.required),
      grade: new FormControl(this.isClient ? '0' : ''),
      telephone: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
    });
    this.user = this.dataRestService.getOneLocalData("user");
  }

  getClient(){
    this.proformasService.getValuesClient().subscribe({
      next:(value)=>{this.allUsers=value}
    })
  }

  ngAfterViewInit(): void {
    if (!(this.users.length > 0)) {
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    combineLatest(
      this.dataRestService.getAll('pointvente', false, this.sModelName),
      this.dataRestService.getAll('pointVente,user', false, 'user-point-vente'),
    ).pipe(map(([users, usersPv]: any[]) => {
      this.allUsers = users;
      this.usersPv = usersPv;
      // this.changeUser();
    },
      (err: any) => {
        const message = "Une erreur s'est produite. \n" + (err.message || '');
        Swal.fire(message, '', 'error').then();
      }
    )).subscribe(() => { }, (err) => { });
  }

  // async onFormSubmit() {
  //   event?.preventDefault();
  //   // Vérifications
  //   if (!this.mpForm.valid) {
  //     Swal.fire("Renseigner tous les champs", "", "warning").then();
  //     return;
  //   }
  //
  //   this.saving = true;
  //   // Traitement
  //   let pTraitement: Promise<any>;
  //   const value = { ...this.user, ...this.mpForm.value, ...{ pv: this.pv.id } };
  //
  //   if (value.id) { // Mode modif
  //     pTraitement = this.dataRestService.update(value, "", this.sModelName);
  //   } else { // Mode enregistrement
  //     pTraitement = this.dataRestService.save(this.sModelName, value);
  //   }
  //   pTraitement.then(response => {
  //     if (response.error) throw response;
  //     setTimeout(() => {
  //       // On réinitialise le formulaire
  //       Swal.fire("L'enregistrement a été effectué avec succès.", "", "success").then();
  //       this.closeModal();
  //       this.loadData();
  //       this.saving = false;
  //     }, 2000);
  //   })
  //     .catch(error => {
  //       Swal.fire("L'enregistrement a échoué. \n" + (error.message || ""), "", "error").then();
  //       this.saving = false;
  //     });
  // }

  // showModal(show = true, data: any | null = null) {
  //   this.user = data;
  //   this.mpForm.patchValue(this.user);
  //
  //   this.openModal();
  //   this.isModalOpen = show;
  // }

  // handleSupprime(data: any) {
  //   Swal.fire({
  //     title: 'Êtes vous sûr de vouloir vraiment supprimer?',
  //     input: 'text',
  //     inputAttributes: {
  //       autocapitalize: 'off',
  //       autocomplete: 'no'
  //     },
  //     reverseButtons: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Delete',
  //     confirmButtonColor: 'brown',
  //     showLoaderOnConfirm: true,
  //     inputPlaceholder: 'Ecrire: delete',
  //     preConfirm: (inputValue: any) => {
  //       if (!(inputValue && inputValue.toLowerCase() === 'delete')) {
  //         Swal.showValidationMessage(`Vous devez entrer&nbsp;<b>delete</b>&nbsp;pour confirmer!`);
  //         return false;
  //       }
  //       return this.dataRestService.delete(data.id || 0, this.sModelName)
  //         .then(response => {
  //           this.loadData();
  //           this.closeModal();
  //           Swal.fire("L'enregistrement a été effectué avec succès.", "", "success").then();
  //         })
  //         .catch(error => {
  //           Swal.fire("La suppression a échouée. \n" + (error.message || ""), "", "error").then();
  //         });
  //     },
  //   }).then();
  // }

  // openModal() {
  //   const modalRef = this.modalService.open(this.ngModal);
  // }
  //
  // closeModal() {
  //   this.mpForm.reset();
  //   const modalRef = this.modalService.dismissAll();
  // }

  // changeUser() {
  //   if (this.isClient) {
  //     this.allUsers = this.allUsers.filter((user: any) => parseInt(user.grade, 10) === 0 && user.pointvente.id === parseInt(this.pv.id, 10));
  //   } else {
  //     this.allUsers = this.allUsers.filter((user: any) => {
  //       parseInt(user.grade, 10) > 0 && user.pointvente.id === parseInt(this.pv.id, 10);
  //       const usersPvIds = this.usersPv.filter((upv: any) => upv.user.id === user.id && upv.pointVente.id === this.pv.id).map((upv: any) => upv.id);
  //       if (usersPvIds.length > 0 && usersPvIds.includes(this.pv.id)) {
  //         return user;
  //       }
  //     });
  //   }
  //
  //   this.users = this.allUsers.map((u: any) => { return { ...u, ...{ poste: this.grades.find((g: any) => g.value === parseInt(u.grade, 10))?.titre } } });
  //   this.loading = false;
  // }

  // reloadData() {
  //   this.loadData();
  //   this.closeModal();
  // }
}
