import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timetable',
  templateUrl: './rubriques.component.html',
  styleUrls: ['./rubriques.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RubriquesComponent {
  [x: string]: any;
  rubriques: any[] = [];
  pv: any = {};
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  rubrique: any = {};
  sModelName = 'rubrique';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
    this.mpForm = new FormGroup({
      description: new FormControl(''),
      nom: new FormControl('', Validators.required),
    });
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.dataRestService.getAll('', false, this.sModelName).then((rubriques: any) => {
      this.rubriques = rubriques;
      this.loading = false;
    }, (err: any) => {
      const message = 'Une erreur s\'est produite. \n' + (err.message || '');
      Swal.fire(message, '', 'error').then();
    });
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
    const value = { ...this.rubrique, ...this.mpForm.value };

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
    this.rubrique = {};
    if (data) {
      this.rubrique = data;
    }
    this.mpForm.patchValue(this.rubrique);

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
}
