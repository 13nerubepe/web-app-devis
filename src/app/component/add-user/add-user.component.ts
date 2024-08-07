import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Input() isClient: boolean = false;
  @Input() users: any[] = [];
  @Output() continueAction: EventEmitter<any> = new EventEmitter();

  [x: string]: any;
  allUsers: any[] = [];
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
  }

  ngAfterViewInit(): void {
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
    const value = { ...this.user, ...this.mpForm.value, ...{ pv: this.pv.id } };

    if (value.id) { // Mode modif      
      pTraitement = this.dataRestService.update(value, "", this.sModelName);
    } else { // Mode enregistrement
      pTraitement = this.dataRestService.save(this.sModelName, value);
    }
    pTraitement.then(response => {
      if (response.error) throw response;
      setTimeout(() => {
        // On réinitialise le formulaire
        Swal.fire("L'enregistrement a été effectué avec succès.", "", "success").then();
        // this.closeModal();
        this.continueAction.emit(response);
        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire("L'enregistrement a échoué. \n" + (error.message || ""), "", "error").then();
        this.saving = false;
      });
  }

  showModal(show = true, data: any | null = null) {
    this.user = data;
    this.mpForm.patchValue(this.user);

    this.openModal();
    this.isModalOpen = show;
  }

  openModal() {
    const modalRef = this.modalService.open(this.ngModal);
  }

  closeModal() {
    this.mpForm.reset();
    const modalRef = this.modalService.dismissAll();
  }

}