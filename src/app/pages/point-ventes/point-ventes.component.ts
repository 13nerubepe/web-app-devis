import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-ventes',
  templateUrl: './point-ventes.component.html',
  styleUrls: ['./point-ventes.component.scss']
})
export class PointVentesComponent {
  [x: string]: any;
  pointVentes: any[] = [];
  allPointVentes: any[] = [];
  users: any[] = [];
  pv: any = {};
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  pointVente: any = {};
  logo: any;
  sModelName = 'point-vente';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;

  constructor(
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
      telephone: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      ville: new FormControl(''),
      adresse: new FormControl(''),
      email: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      devise: new FormControl('', Validators.required),
      taxe: new FormControl(''),
      stockAlert: new FormControl(''),
      proformaAlert: new FormControl(''),
      proformaPourcentage: new FormControl(''),
      proformaDelais: new FormControl(''),
      // admin: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(this.dataRestService.getAll('admin', false, this.sModelName),
    ).pipe(map(([pointVentes]: any[]) => {
      this.allPointVentes = pointVentes;
      this.changePv();
    },
      (err: any) => {
        const message = 'Une erreur s\'est produite. \n' + (err.message || '');
        Swal.fire(message, '', 'error').then();
      })).subscribe(() => { }, (err) => { });
  }

  async onFormSubmit() {
    event?.preventDefault();
    // Vérifications     
    if (!this.mpForm.valid) {
      Swal.fire('Renseigner tous les champs', '', 'warning').then();
      return;
    }

    this.saving = true;
    // Traitement
    let pTraitement: Promise<any>;
    const value = { ...this.pointVente, ...this.mpForm.value, ...{ logo: this.logo } };

    if (value.id) { // Mode modif      
      pTraitement = this.dataRestService.update(value, '', this.sModelName);
    } else { // Mode enregistrement
      pTraitement = this.dataRestService.save(this.sModelName, value);
    }
    pTraitement.then(response => {
      if (response.error) throw response;
      setTimeout(() => {
        // On réinitialise le formulaire
        Swal.fire('L\'enregistrement a été effectué avec succès.', '', 'success').then();
        this.closeModal();
        this.loadData();
        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire('L\'enregistrement a échoué. \n' + (error.message || ''), '', 'error').then();
        this.saving = false;
      });
  }

  showModal(show = true, data: any | null = null) {
    this.openModal();
    this.isModalOpen = show;
  }

  handleSupprime(data: any) {
    Swal.fire({
      title: 'Êtes vous sûr de vouloir vraiment supprimer?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        autocomplete: 'no'
      },
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'brown',
      showLoaderOnConfirm: true,
      inputPlaceholder: 'Ecrire: delete',
      preConfirm: (inputValue: any) => {
        if (!(inputValue && inputValue.toLowerCase() === 'delete')) {
          Swal.showValidationMessage(`Vous devez entrer&nbsp;<b>delete</b>&nbsp;pour confirmer!`);
          return false;
        }
        return this.dataRestService.delete(data.id || 0, this.sModelName)
          .then(response => {
            this.loadData();
            this.closeModal();
            Swal.fire('La suppression a été effectué avec succès.', '', 'success').then();
          })
          .catch(error => {
            Swal.fire('La suppression a échouée. \n' + (error.message || ''), '', 'error').then();
          });
      },
    }).then();
  }

  openModal() {
    const modalRef = this.modalService.open(this.ngModal);
  }

  closeModal() {
    this.mpForm.reset();
    const modalRef = this.modalService.dismissAll();
  }

  loadImage(event: any) {
    this.logo = event;
  }

  changePv() {
    this.pointVentes = this.allPointVentes.map((pv: any) => {
      return { ...pv, ...{ admin: pv.admin.id } }
    });

    this.pointVente = this.pointVentes.find((pv: any) => pv.id === this.pv.id);
    this.mpForm.patchValue(this.pointVente);

    // this.users = users.filter((user: any) => parseInt(user.grade, 10) > 0);
    this.loading = false;
  }
}
