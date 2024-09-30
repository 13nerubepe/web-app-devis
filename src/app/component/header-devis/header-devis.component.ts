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
  filteredClients: Client[] =[];
  selectedProducts: Product[] = [];
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
    })
  }

  // //valeur que lutilisateur saisi

  ngOnInit(): void {
    this.proformasService.Products$.subscribe(products => {
      this.selectedProducts = products;
    });
    this.getProduct();
    this.getClient();
  }

  getClient(){
    this.proformasService.getValuesClient().subscribe({
      next:(value)=>{
        this.clients=value}
    });
    return this.clients;
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

  filterClient(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase(); // Convertir la saisie en minuscules pour un filtrage insensible à la casse
    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().startsWith(query) // Filtrer par correspondance sur le début du nom du client
    );
  }

  // Fonction pour gérer la sélection du client
  onClientSelect(event: AutoCompleteSelectEvent) {
    this.selectedClient = event.value as Client; // Assurez-vous que c'est un Client
    // console.log('CLIENT SÉLECTIONNÉ', this.selectedClient); // Affichage dans la console
    this.afficheClientSelectionnéForm();
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

  // si client nexiste pas, creer un client
  // addClient() {
  //   if (this.formClient.valid) {
  //     // Récupérer les valeurs du formulaire
  //     const valueClient = this.formClient.value;
  //     console.log('Valeurs du formulaire:', valueClient); // Affiche les valeurs du formulaire
  //
  //     this.DevisDialog = false; // Ferme le dialogue après la soumission
  //   } else {
  //     console.log('Formulaire invalide');
  //   }
  // }
  dummyAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(null); // ou retourner un Observable d'erreur si nécessaire
    };
  }


  // Fonction qui se déclenche à chaque changement de quantité
  onQuantityChange(product: Product) {
    if (product.qte && product.prixUnitaire) {
      const total = product.qte * product.prixUnitaire;
      console.log('Total HT pour ce produit:', total);
      console.log('Quantité modifiée:', product.qte);
    }
  }

  openDialog() {
    this.DevisDialog = true;
  }
  // Optionnel: Gestion de la sélection de ligne entière (si vous voulez) ou plusieurs
  onRowSelect(event: any) {
    // Vérification que la quantité est bien saisie et calcul du total
    // Récupérer le produit sélectionné
    const selectedP = event.data;
    // Vérification que la quantité et le prix unitaire sont bien saisis, puis calcul du total
    this.onQuantityChange(selectedP); // Calculer le total dès la sélection

    // Vérifier si le produit est déjà dans la liste des produits sélectionnés
    const existingProduct = this.selectedProducts.find(p => p.productId === selectedP.productId);
    // Si le produit n'est pas déjà sélectionné, on l'ajoute à la liste
    if (!existingProduct) {
      this.selectedProducts.push(selectedP);
    }

    console.log('Produits sélectionnés ici:', this.selectedProducts);
  }

// CALCULE LA TOTAL DE CHAQUE PRODUIT
  calculTotalHtEachProduct(products:Product): any{
    if(products.qte &&products.prixUnitaire){
      const totalHt = products.qte * products.prixUnitaire;
      return totalHt;
    }
  }

  creerDevis(){
    // Vérifier que des produits et un client ont été sélectionnés
    if (this.selectedProducts.length === 0) {
      console.error("Aucun produit sélectionné.");
      return;
    }

    if (!this.selectedClient) {
      console.error("Aucun client sélectionné.");
      return;
    }
    // this.calculTotalHtEachProduct(this.products);

    // Calculer le total HT de tous les produits sélectionnés
      const totalTHt = this.selectedProducts.reduce((acc, product) => {
        const qte = product.qte ?? 0;
        const prixUnitaire =product.prixUnitaire ?? 0;
        return acc + (qte * prixUnitaire);
      }, 0);

    // Préparer les IDs des produits pour le devis
    const productIds = this.selectedProducts.map(product => product.productId);

    // Construire l'objet devis
    const devis = {
      clientId: this.selectedClient.clientId,
      productIds: productIds,
      totalTHt: totalTHt,
      reduction: false, // Tu peux changer cette valeur selon ton besoin
      totalTva: totalTHt * 0.19, // Calcul de la TVA (19%)
      date: new Date(),
      cassier: "Cassier par défaut" // Tu peux récupérer cette valeur dynamiquement
    };
  console.log("objet devis cree:", devis)
    // Envoyer le devis au backend via le service
    this.proformasService.creerDevis(devis).subscribe({
      next: response => {
        console.log("Devis créé avec succès :", response);
      },
      error: error => {
        console.error("Erreur lors de la création du devis :", error);
      }
    });
  }

  grades = [
    { titre: "Administrateur", value: 50 },
    { titre: "Chef de point de vente", value: 35 },
    { titre: "Caissier(e)", value: 30 },
    { titre: "Client", value: 0 },
  ]



}
