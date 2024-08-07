import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destockages',
  templateUrl: './destockages.component.html',
  styleUrls: ['./destockages.component.scss']
})
export class DestokagesComponent {
  [x: string]: any;
  destockages: any[] = [];
  allDestockages: any[] = [];
  produits: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  destockage: any = {};
  sModelName = 'destockage';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;

  topcards: any[] = [];
  pv: any = {};
  user: any = {};

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal,
    private appDataStoreService: AppDataStoreService,
  ) {
    this.pv = this.dataRestService.getOneLocalData("pv");
    this.user = this.dataRestService.getOneLocalData("user");
  }

  ngOnInit(): void {
    this.appDataStoreService.selectedPointVente.subscribe((pointVente: any) => {
      if (pointVente) {
        this.pv = pointVente;
        this.changeDestockage();
      }
    });

    this.mpForm = new FormGroup({
      motif: new FormControl('', Validators.required),
      quantite: new FormControl('', Validators.required),
      produit: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(this.dataRestService.getAll('produit,pointVente', false, this.sModelName),
      this.dataRestService.getAll('', false, 'produit'),
    ).pipe(map(([destockages, produits]: any[]) => {
      this.allDestockages = destockages;
      this.changeDestockage();
      this.produits = produits;
      this.loading = false;
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

    const data = { ...this.mpForm.value, ...{ pv: this.pv.id, user: this.user.id } };
    if (this.destockage.id) { // Mode modif            
      pTraitement = this.dataRestService.update({ ...data, ...{ id: this.destockage.id } }, '', this.sModelName);
    } else {
      // Mode enregistrement
      pTraitement = this.dataRestService.save(this.sModelName, data);
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

  showModal(show = true, data: any = null) {
    if (data) {
      this.destockage = data;
    }
    this.mpForm.patchValue(this.destockage);

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
          Swal.showValidationMessage(`You must enter&nbsp;<b>delete</b>&nbsp;to confirm!`);
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

  changeDestockage() {
    this.destockages = this.allDestockages.filter((d: any) => d.pointVente.id === this.pv.id);
  }
}
