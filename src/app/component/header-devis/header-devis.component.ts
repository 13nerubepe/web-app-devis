import { Component, Input, OnInit, Signal } from "@angular/core";
import { AsyncPipe, CurrencyPipe, KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProformasService } from "../../service/proformas.service";
import { lastValueFrom, Observable, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { Client, Devis, Product } from "../../classes/table-data";
import { Button } from "primeng/button";
import { PrimeTemplate } from "primeng/api";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TableModule } from "primeng/table";

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
    KeyValuePipe
  ],
  templateUrl: './header-devis.component.html',
  styleUrl: './header-devis.component.scss',
})
export class HeaderDevisComponent implements OnInit{
  grade: any = {};
  formValues =  this.proformasService.getFormValue();
   selectedProducts: Product[] = [];
  selecteQuantite!:Devis| null;
  constructor(private formBuider: FormBuilder, protected proformasService: ProformasService) {}
  ngOnInit(): void {
    this.proformasService.client$.subscribe(client => {
      if (client) {
        this.updateFormClient(client)
      }
    });

    this.proformasService.Products$.subscribe(products => {
      this.selectedProducts = products;
    });

    // this.proformasService.Quantite$.subscribe(quantite => {
    //   this.selecteQuantite = quantite;
    // })
  }



//valeur que lutilisateur saisi
  formClient = this.formBuider.group({
    image:[''],
    nom: [''],
    email:[''],
    phone: [''],
    address: [''],
    ville:[''],
    grade: ['']
    // nom: this.formValues?.client.nom || '',
    // email: this.formValues?.client.email || '',
    // phone: this.formValues?.client.phone || '',
    // ville: this.formValues?.client.ville || '',
    // address: this.formValues?.client.address || '',
    // grade: this.formValues?.client.grade || '',
  })
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

  // onQuantityChange(devis: Devis, quantity: number): void {
  //   if (devis.topSelling) {
  //     devis.topSelling.qte = quantity;
  //     this.updateTotalHT(devis);
  //   }
  //   // const product = devis.topSelling;
  //   // if (product && product.prixUnitaire !== undefined) {
  //   //   product.qte = quantity;
  //   //   product.totalHT = product.prixUnitaire * quantity;
  //   //   // Met à jour le produit dans le service
  //   //   this.proformasService.updateProduct(product);
  //   // } else {
  //   //   console.error('Prix unitaire est undefined pour le produit:', product);
  //   // }
  // }
  // updateTotalHT(devis:Devis): void {
  //   if (devis.topSelling) {
  //     devis.topSelling.totalHT = (devis.topSelling.qte || 0) * this.getUnitPrice(devis);
  //   }
  //   // this.selectedProducts = this.selectedProducts.map(product => ({
  //   //   ...product,
  //   //   totalHT: (product.qte || 0) * (product.prixUnitaire || 0),
  //   //   totalTtc: ((product.qte || 0) * (product.prixUnitaire || 0)) * 1.2 // Exemple avec TVA de 20%
  //   // }));
  // }
  // // Appelé lorsque l'utilisateur change la quantité
  // // onQuantityChange(devis: Devis, quantity: number): void {
  // //   const product = devis.topSelling;
  // //   if (product) {
  // //     product.qte = quantity;
  // //     product.totalHT = product.prixUnitaire * quantity;
  // //     // Met à jour le produit dans le service
  // //     this.proformasService.updateProduct(product);
  // //   }
  // //
  // //   // product.qte = quantity;
  // //   // product.totalHT = product.prixUnitaire * quantity;
  // //   // // Met à jour le produit dans le service
  // //   // this.productService.updateProduct(product);
  // // }
  // getUnitPrice(devis: Devis): number {
  //   // Retournez le prix unitaire du produit dans le devis
  //   // Ceci est un exemple, remplacez par votre propre logique
  //   return devis.topSelling?.prixUnitaire || 0;
  // }



}
