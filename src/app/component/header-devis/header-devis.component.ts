import { Component, Input, OnInit, signal, Signal } from "@angular/core";
import { AsyncPipe, CurrencyPipe, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder, FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from "@angular/forms";
import { ProformasService } from "../../service/proformas.service";
import { Client, Devis, Product } from "../../classes/table-data";
import { Button } from "primeng/button";
import { PrimeTemplate } from "primeng/api";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { Observable, of } from "rxjs";
import { MenuModule } from "primeng/menu";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { PickListModule } from "primeng/picklist";
import { OrderListModule } from "primeng/orderlist";
import { InputNumberModule } from "primeng/inputnumber";
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from "primeng/autocomplete";


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
    DialogModule,
    DropdownModule,
    PickListModule,
    OrderListModule,
    InputNumberModule,
    AutoCompleteModule
  ],
  templateUrl: './header-devis.component.html',
  styleUrl: './header-devis.component.scss',
})
export class HeaderDevisComponent implements OnInit{
  grade: any = {};
  clients:Client[]=[];
  products:Product[]=[];
  selectedProducts: Product[] = [];
  filteredClients: Client[] =[];
  selectedClient!:Client; // VARIABLE QUI PERMET DE STOCKER LA VALEUR client SELECTIONée par lutilisateur
  DevisDialog: boolean = false;
  formClient:FormGroup;

  constructor(private formBuider: FormBuilder, protected proformasService: ProformasService) {
    this.formClient =  this.formBuider.group({
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
  }

  // //valeur que lutilisateur saisi

  ngOnInit(): void {
    this.proformasService.client$.subscribe(client => {
      if (client) {
        this.updateFormClient(client)
      }
    });
    this.proformasService.Products$.subscribe(products => {
      this.selectedProducts = products;
    });
    this.getProduct();
    this.getClient()
  }

  afficheClientSelectionnéForm(): void {
    if (this.selectedClient) {
      this.formClient.patchValue({
        image: this.selectedClient.image,
        nom: this.selectedClient.nom,
        email: this.selectedClient.email,
        phone: this.selectedClient.phone,
        address: this.selectedClient.address,
        ville: this.selectedClient.ville,
        grade: this.selectedClient.grade,
      });
    }
  }


  dummyAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(null); // ou retourner un Observable d'erreur si nécessaire
    };
  }

  filterClient(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase(); // Convertir la saisie en minuscules pour un filtrage insensible à la casse
    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().startsWith(query) // Filtrer par correspondance sur le début du nom du client
    );
  }

  // Fonction pour gérer la sélection du client
  onClientSelect(event: AutoCompleteSelectEvent) {
    this.selectedClient = event.value as Client; // Assurez-vous que c'est un Client
    console.log('CLIENT SÉLECTIONNÉ', this.selectedClient); // Affichage dans la console
    this.afficheClientSelectionnéForm();
  }

  // onClientSelect(selecte: AutoCompleteSelectEvent) {
  //   this.selectedClient = selecte;
  //   console.log('CLIENT SELECTIONNé', this.selectedClient);
  //   // this.selectedClient = event; // Assignez le client sélectionné
  //   // this.formClient.patchValue({
  //   //   nom: this.selectedClient.nom,
  //   //   email: this.selectedClient.email,
  //   //   phone: this.selectedClient.phone,
  //   //   address: this.selectedClient.address,
  //   //   ville: this.selectedClient.ville,
  //   //   grade: this.selectedClient.grade
  //   // });
  // }
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

  getClient(){
    this.proformasService.getValuesClient().subscribe({
      next:(value)=>{
        this.clients=value;
        console.log('La liste des clients:', this.clients)
      }
    });
    return this.clients;
    // this.proformasService.getValuesClient().then((prod)=> {
    //   this.products = prod;
    // });
  }
  getProduct(){
    this.proformasService.getValuesProduct().subscribe({
      next:(value)=>{
        this.products= value;
        console.log('La liste des clients:', this.products)
      }
    });
    return this.products;
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
