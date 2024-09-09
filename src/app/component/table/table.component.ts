import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  Product,
  TableRows,
  Employee,
  Devis,
  Client,
  ValeursRequest
} from "../../classes/table-data";
import { NgFor } from '@angular/common';
import { ProformasService } from "../../service/proformas.service";
import { Button } from "primeng/button";
import { PrimeTemplate } from "primeng/api";
import { TableLazyLoadEvent, TableModule } from "primeng/table";
import { InputNumberModule } from "primeng/inputnumber";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectButtonModule } from "primeng/selectbutton";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, Button, PrimeTemplate, TableModule, InputNumberModule, SelectButtonModule, DropdownModule, FormsModule, MultiSelectModule, ReactiveFormsModule],
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
  @Output() devisFormValues = new EventEmitter<any>();
  search= this.fb.nonNullable.group({
    nom:['']
  })

  // faut initialiser pour que la liste de client ne soit pas vide
  client: Client[]=[];
  products: Product[]=[];
   devis: Devis[] = [];
  // devis = combineLatest([ this.proformasService.getCombinedData(this.request), this.search.controls.nom.valueChanges])
  trow: TableRows[];
  request: ValeursRequest ={
    first:0 ,
    rows:5,
    sortField:'',
    sortOrder:1 }



  constructor(
    private fb: FormBuilder,
    private proformasService: ProformasService,
    //     this.items = [];
    //   for (let i = 0; i < 10000; i++) {
    //   this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    // }
  ) {
    // this.producttopSelling = TopSelling;
    this.trow = Employee;
  }

   ngOnInit() {
    this.getLoadDevis()

   }


  // ---------------------------------------------------------------------FONCTIONS-----------------------------------------------------------------------

  getLoadDevis(): void{
    console.log(this.request);
     this.proformasService.getCombinedData().subscribe({
       next:(value)=>{
         this.devis= value;
         console.log('recuperation reussi',value)
       },
       error: (err) => {
         console.error('Erreur lors de la récupération des devis', err);
       }
     })
  }

  // ----------------------------------FONCTION---------------------------------------------

  load($event: TableLazyLoadEvent) {
    // console.log("$event: ", $event);
    // this.request.first = $event.first || 0;
    // this.request.sortField =$event.sortField || '';
    // this.request.sortOrder = $event.sortOrder || 1
    // this.getLoadDevis()

  }
   selectionClient(devis: Devis):void {
    // const selectedClient = devis.clientId; // Récupérer le client du devis
    const selectedClient = this.client.find(client => client.clientId === devis.clientId);
    if (selectedClient) {
      // const p= parseInt(selectedClient.phone.replace(/\D/g, ''), 10)
      this.proformasService.setClient(selectedClient); // Met à jour le client dans le service
      // VERIFIONS dans les logs si ca recupere le client
      this.proformasService.client$.subscribe({
        next: (value) => console.log('Client sélectionné: ', value)
      })
    } else {
      console.error('Client non trouvé pour le devis:', devis);
    }
   }
  selectionProduct(devis: Devis):void {
     const selectedProduct = this.products.find(product =>product.productId ===devis.productId)
    if(selectedProduct){
      // COMME CA PASSE UN TABLEAU DE PRODUIT
      this.proformasService.setProduct([selectedProduct])
       // this.selectedProducts.push(selectedProduct);
       console.log('Produit sélectionné:', selectedProduct);
    }
  }

  updateQuantity(quantite:Devis){
    this.proformasService.setQuantite(quantite);
  }

  onQuantityChange(devis: Devis, event: any): void {
    if(devis.product){
      devis.product.qte = event !== undefined ? event : 0; // Valeur par défaut 0 ou gérez comme nécessaire;
      // devis.topSelling.totalHT = event * this.getUnitPrice(devis);
      console.log("devis.topSelling.qte: ", devis.product.qte);
      if (typeof devis.product.qte === 'number') {
        // Envoi de la quantité pour un objet spécifique
        this.proformasService.updatequantite(devis.productId, devis.product.qte).subscribe();
      }
    }
  }
  // getUnitPrice(devis: Devis): number {
  //   return devis.product.prixUnitaire || 0;
  // }



}
