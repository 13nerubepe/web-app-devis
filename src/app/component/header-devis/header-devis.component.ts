import { Component, Input, OnInit, signal, Signal } from "@angular/core";
import { AsyncPipe, CurrencyPipe, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from "@angular/forms";
import { ProformasService } from "../../service/proformas.service";
import { Client, Devis, Product } from "../../classes/table-data";
import { Button } from "primeng/button";
import { MenuItem, PrimeTemplate } from "primeng/api";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from "rxjs";
import { MenuModule } from "primeng/menu";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: 'app-header-devis',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgSelectModule,
    ReactiveFormsModule,
    Button,
    PrimeTemplate,
    ScrollPanelModule,
    TableModule,
    FormsModule,
    AsyncPipe,
    CurrencyPipe,
    KeyValuePipe,
    CardModule,
    MenuModule,
    DialogModule
  ],
  templateUrl: './header-devis.component.html',
  styleUrl: './header-devis.component.scss',
})
export class HeaderDevisComponent implements OnInit{
  grade: any = {};
  // formValues =  this.proformasService.getFormValue();
   selectedProducts: Product[] = [];
  DevisDialog: boolean = false;
  // selecteQuantite!:Devis| null;
  constructor(private formBuider: FormBuilder, protected proformasService: ProformasService) {
    this.formClient;
  }
  ngOnInit(): void {
    this.proformasService.client$.subscribe(client => {
      if (client) {
        this.updateFormClient(client)
      }
    });
    this.proformasService.Products$.subscribe(products => {
      this.selectedProducts = products;
    });
  }

// //valeur que lutilisateur saisi
  formClient =  this.formBuider.group({
    // image: this.formBuider.control ('', [Validators.required]),
    image: ['', Validators.required],
    nom: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)], [this.dummyAsyncValidator()]],
    address: ['', Validators.required],
    ville:['', Validators.required],
    grade: ['', Validators.required]
    // nom: this.formValues?.client.nom || '',
    // email: this.formValues?.client.email || '',
    // phone: this.formValues?.client.phone || '',
    // ville: this.formValues?.client.ville || '',
    // address: this.formValues?.client.address || '',
    // grade: this.formValues?.client.grade || '',
  })
  dummyAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(null); // ou retourner un Observable d'erreur si nécessaire
    };
  }
  openDialog() {
    this.DevisDialog = true;
  }
  addClient() {
    if (this.formClient.valid) {
      // Récupérer les valeurs du formulaire
      const valueClient = this.formClient.value;
      console.log('Valeurs du formulaire:', valueClient); // Affiche les valeurs du formulaire

      this.DevisDialog = false; // Ferme le dialogue après la soumission
    } else {
      console.log('Formulaire invalide');
    }
  }

  updateFormClient(client:Client){
    // Mettre à jour le formulaire avec les informations du client sélectionné si nécessaire
     if (client) {
       this.formClient.patchValue({
         image: client.image,
         nom: client.nom,
         email: client.email,
         phone: client.phone.toString(),
         address: client.address,
         ville: client.ville,
         grade: client.grade
       });
     }
  }

  grades = [
    { titre: "Administrateur", value: 50 },
    { titre: "Chef de point de vente", value: 35 },
    { titre: "Caissier(e)", value: 30 },
    { titre: "Client", value: 0 },
  ]



}
