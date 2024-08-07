import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss'],
})
export class CommandesComponent {
  [x: string]: any;
  commandes: any[] = [];
  allCommandes: any[] = [];
  selectedCommandes: any[] = [];
  ventes: any[] = [];
  allVentes: any[] = [];
  produits: any[] = [];
  pv: any = {};
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  commande: any = {};
  vente: any = {};
  sModelName = 'commande';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;
  currencySymbol: string = 'XAF';

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal,
    private appDataStoreService: AppDataStoreService,
  ) { }

  ngOnInit(): void {
    this.mpForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      nom: new FormControl('', Validators.required),
    });
    // this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(
      this.dataRestService.getAll('vente,produit', false, this.sModelName),
      this.dataRestService.getAll('commandes,client', false, 'vente'),
      this.dataRestService.getAll('', false, 'produit')
    )
      .pipe(
        map(
          ([commandes, ventes, produits]: any[]) => {
            this.allCommandes = commandes
            this.allVentes = ventes;
            this.produits = produits;

            this.loading = false;
          },
          (err: any) => {
            const message =
              "Une erreur s'est produite. \n" + (err.message || '');
            Swal.fire(message, '', 'error').then();
          }
        )
      )
      .subscribe(
        () => { },
        (err) => { }
      );
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
    if (this.mpForm.value.id) {
      // Mode modif
      pTraitement = this.dataRestService.update(
        this.mpForm.value,
        '',
        this.sModelName
      );
    } else {
      // Mode enregistrement
      pTraitement = this.dataRestService.save(
        this.sModelName,
        this.mpForm.value
      );
    }
    pTraitement
      .then((response) => {
        if (response.error) throw response;
        setTimeout(() => {
          // On réinitialise le formulaire
          Swal.fire(
            "L'enregistrement a été effectué avec succès.",
            '',
            'success'
          ).then();
          this.closeModal();
          this.loadData();
          this.saving = false;
        }, 2000);
      })
      .catch((error) => {
        Swal.fire(
          "L'enregistrement a échoué. \n" + (error.message || ''),
          '',
          'error'
        ).then();
        this.saving = false;
      });
  }

  showModal(data: any, show = true) {
    this.vente = data;
    this.selectedCommandes = this.commandes.filter(
      (commande: any) => commande.vente.id === data.id
    );
    this.openModal();
    this.isModalOpen = show;
  }

  handleSupprime(data: any) {
    Swal.fire({
      title: 'Êtes vous sûr de vouloir vraiment supprimer?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        autocomplete: 'no',
      },
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'brown',
      showLoaderOnConfirm: true,
      inputPlaceholder: 'Ecrire: delete',
      preConfirm: (inputValue: any) => {
        if (!(inputValue && inputValue.toLowerCase() === 'delete')) {
          Swal.showValidationMessage(
            `Vous devez entrer&nbsp;<b>delete</b>&nbsp;pour confirmer!`
          );
          return false;
        }
        return this.dataRestService
          .delete(data.id || 0, this.sModelName)
          .then((response) => {
            this.loadData();
            this.closeModal();
            Swal.fire(
              'La suppression a été effectué avec succès.',
              '',
              'success'
            ).then();
          })
          .catch((error) => {
            Swal.fire(
              'La suppression a échouée. \n' + (error.message || ''),
              '',
              'error'
            ).then();
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

  print(data: any) {
    console.log(data);
  }
}
