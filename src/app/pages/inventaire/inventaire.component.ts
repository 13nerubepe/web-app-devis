import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent {
  [x: string]: any;
  inventaires: any[] = [];
  allInventaires: any[] = [];
  allProduits: any[] = [];
  produits: any[] = [];
  audits: any[] = [];
  allAudits: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  inventaire: any = {};
  sModelName = 'inventaire';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;

  topcards: any[] = [];
  pv: any = {};
  user: any = {};
  difference = 0;

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
        this.changeInventaire();
      }
    });

    this.mpForm = new FormGroup({
      quantiteA: new FormControl('', Validators.required),
      quantiteC: new FormControl('', Validators.required),
      difference: new FormControl(this.difference, Validators.required),
      produit: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(this.dataRestService.getAll('produit,pointVente,audit', false, this.sModelName),
      this.dataRestService.getAll('pointVente', false, 'produit'),
      this.dataRestService.getAll('pointVente,produit', false, 'audit'),
    ).pipe(map(([inventaires, produits, audits]: any[]) => {
      this.allInventaires = inventaires;
      this.allProduits = produits;
      this.allAudits = audits;
      this.changeInventaire();
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
    if (this.inventaire.id) { // Mode modif            
      pTraitement = this.dataRestService.update({ ...data, ...{ id: this.inventaire.id } }, '', this.sModelName);
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
      this.inventaire = data;
    }
    this.mpForm.patchValue(this.inventaire);

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

  changeInventaire() {
    this.chargeInventaire();
    this.audits = this.allAudits.filter((p: any) => p.pointVente.id === this.pv.id);
    this.loading = false;
  }

  chargeInventaire() {
    this.produits = this.allProduits.filter((p: any) => p.pointVente.id === this.pv.id);
    const keyIds = Object.keys(_.groupBy(this.produits, 'id'));
    this.inventaires = this.allInventaires.filter((d: any) => keyIds.includes(d.produit.id));
  }

  handleFiltreCategorie(value: any) {
    const auditId = parseInt(value);
    this.chargeInventaire();
    if (auditId) {
      this.inventaires = this.inventaires.filter((e) => e?.audit.id === auditId) || null;
    }
  }

  chargeQteConstate(value: any) {
    const produitId = parseInt(value);
    const produit = this.produits.find((p) => p?.id === produitId) || null;
    if (produit) {
      this.mpForm.value.quantiteC = produit.qteStock;
    }
  }

  updateDiffQte(value: any) {
    this.difference = this.mpForm.value.quantiteC - parseInt(value);
  }
}
