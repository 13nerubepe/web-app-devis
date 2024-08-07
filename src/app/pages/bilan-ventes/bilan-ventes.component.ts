import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bilan-ventes',
  templateUrl: './bilan-ventes.component.html',
  styleUrls: ['./bilan-ventes.component.scss']
})
export class BilanVenteComponent {
  [x: string]: any;
  bilanVentes: any[] = [];
  filieres: any[] = [];
  _cours: any[] = [];
  pv: any[] = [];
  filiere_id: any;
  isModalOpen: boolean = false;
  loading: boolean = true;
  update: boolean = false;
  saving: boolean = false;
  bilanVente: any = {};
  sModelName = 'cours';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  mpForm!: FormGroup;

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
    this.mpForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      titre: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      partie: new FormControl('', Validators.required),
      // filiere: new FormControl('', Validators.required),
      nombreSeance: new FormControl('', Validators.required),
      tarif: new FormControl(''),
      duree: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  loadData() {
    combineLatest(this.dataRestService.getAll('scheduledCourses,inscriptions,filiere', false, this.sModelName),
      this.dataRestService.getAll('specialites', false, 'filiere'),
    ).pipe(map(([cours, filieres]: any[]) => {
      this.bilanVentes = cours;
      this.filieres = filieres;
      this._cours = cours;
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
    if (this.mpForm.value.id) { // Mode modif      
      pTraitement = this.dataRestService.update(this.mpForm.value, '', this.sModelName);
    } else { // Mode enregistrement
      pTraitement = this.dataRestService.save(this.sModelName, this.mpForm.value);
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
    this.bilanVente = {};
    if (data) {
      this.bilanVente = data;
    }
    this.mpForm.patchValue(this.bilanVente);

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

  handleFiltreCommandes(event: any) {
    this.filiere_id = parseInt(event.target.value);
    const cours = this._cours;
    this.bilanVentes = this._cours;
    if (this.filiere_id) {
      this.bilanVentes = cours.filter(e => e?.filiere.id === this.filiere_id) || null;
    }
  }
}