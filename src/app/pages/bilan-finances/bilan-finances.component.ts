import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bilan-finances',
  templateUrl: './bilan-finances.component.html',
  styleUrls: ['./bilan-finances.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BilanFinancesComponent {
  [x: string]: any;
  specialites: any[] = [];
  salles: any[] = [];
  bilanFinances: any[] = [];
  cours: any[] = [];
  jours: any[] = [];
  sessions: any[] = [];
  apprenants: any[] = [];
  filieres: any[] = [];
  scheduledClasses: any = {};
  bilanFinance: any = {};
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  specialite: any = {};
  trancheH: any = {};
  session: any = { id: 1 };
  formateur: any = { id: 1 };
  jour: any = {};
  partie: any;
  partieS = 1;
  sModelName = 'bilanFinances';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.mpForm = new FormGroup({
      id: new FormControl(''),
      // description: new FormControl(''),
      titre: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      initial: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.dataRestService.getAll('sessions', false, this.sModelName).then((bilanFinances: any) => {
      this.bilanFinances = bilanFinances;
      setTimeout(() => {
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }, 100);
    },
      (err: any) => {
        const message = "Une erreur s'est produite. \n" + (err.message || "");
        Swal.fire(message, "", "error").then();
      })
  }

  async onFormSubmit() {
    event?.preventDefault();
    // Vérifications     
    if (!this.mpForm.valid) {
      Swal.fire("Renseigner tous les champs", "", "warning").then();
      return;
    }

    this.saving = true;
    // Traitement
    let pTraitement: Promise<any>;
    if (this.mpForm.value.id) { // Mode modif      
      pTraitement = this.dataRestService.update(this.mpForm.value, "", this.sModelName);
    } else { // Mode enregistrement
      pTraitement = this.dataRestService.save(this.sModelName, this.mpForm.value);
    }
    pTraitement.then(response => {
      if (response.error) throw response;
      setTimeout(() => {
        // On réinitialise le formulaire
        Swal.fire("L'enregistrement a été effectué avec succès.", "", "success").then();
        this.closeModal();
        this.loadData();
        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire("L'enregistrement a échoué. \n" + (error.message || ""), "", "error").then();
        this.saving = false;
      });
  }

  showModal(show = true, data: any | null = null) {
    this.bilanFinance = {};
    if (data) {
      this.bilanFinances = data;
    }
    this.mpForm.patchValue(this.bilanFinances);

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
            Swal.fire("L'enregistrement a été effectué avec succès.", "", "success").then();
          })
          .catch(error => {
            Swal.fire("La suppression a échouée. \n" + (error.message || ""), "", "error").then();
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
