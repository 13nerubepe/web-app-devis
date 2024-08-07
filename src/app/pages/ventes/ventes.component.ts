import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventes',
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VentesComponent {
  [x: string]: any;
  ventes: any[] = [];
  produits: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  vente: any = {};
  sModelName = 'vente';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;

  topcards: any[] = [];
  pv: any = {};

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal,
  ) {
    this.pv = this.dataRestService.getOneLocalData("pv") || 1;
  }

  ngOnInit(): void {
    this.mpForm = new FormGroup({
      dateAchat: new FormControl('', Validators.required),
      prixVente: new FormControl('', Validators.required),
      prixAchat: new FormControl('', Validators.required),
      quantite: new FormControl('', Validators.required),
      produit: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(this.dataRestService.getAll('produit', false, this.sModelName),
      this.dataRestService.getAll('', false, 'produit'),
    ).pipe(map(([ventes, produits]: any[]) => {
      this.ventes = ventes;
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

    const data = { ...this.mpForm.value, ...{ pv: this.pv.id } };
    if (this.vente.id) { // Mode modif            
      pTraitement = this.dataRestService.update({ ...data, ...{ id: this.vente.id } }, '', this.sModelName);
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
    this.vente = { dateAchat: '' };
    if (data) {
      this.vente = data;
      this.vente = {
        ...this.vente,
        ...{ produit: this.vente?.produit.id },
        ...{ dateAchat: this.vente?.dateAchat?.substr(0, 10) || '' },
      }
    }
    this.mpForm.patchValue(this.vente);

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
}