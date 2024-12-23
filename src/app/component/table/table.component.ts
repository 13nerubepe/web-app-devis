import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  Product,
  TableRows,
  Employee,
  Devis,
  Client, ApiResponse, PageDto, Objet
} from "../../classes/table-data";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ProformasService } from "../../service/proformas.service";
import { Button } from "primeng/button";
import { PrimeTemplate } from "primeng/api";
import { TableLazyLoadEvent, TableModule } from "primeng/table";
import { InputNumberModule } from "primeng/inputnumber";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectButtonModule } from "primeng/selectbutton";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { PaginatorService } from "../../service/paginator.service";
import { BehaviorSubject, iif, Observable, of } from "rxjs";
import { state } from "@angular/animations";
import { HttpErrorResponse } from "@angular/common/http";
import { PaginatorModule } from "primeng/paginator";
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, Button, PrimeTemplate, TableModule, InputNumberModule, SelectButtonModule, DropdownModule, FormsModule, MultiSelectModule, ReactiveFormsModule, NgIf, AsyncPipe, PaginatorModule],
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
  @Output() devisFormValues = new EventEmitter<any>();
  search= this.fb.nonNullable.group({
    nom:['']
  })


  // usersState$: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }>;
  // responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  // faut initialiser pour que la liste de client ne soit pas vide
  client: Client[]=[];
  products: Product[]=[];
  devis: Devis[] = [];
  objet: Objet[]=[];
  combinedData: Devis[]=[];
  // initialiser ca dans le constructeur ou ailleurs
  devisState$: Observable<{ appState: string, appData?: ApiResponse<PageDto>, error?: HttpErrorResponse }>= of({ appState: 'INITIAL' });
  // devis = combineLatest([ this.proformasService.getCombinedData(this.request), this.search.controls.nom.valueChanges])
  trow: TableRows[];
  // Variables pour la pagination
   totalPages!:number; //Le nombre total de pages disponibles
   pageNumber:number=0;// currentPage: number = 0;  //Le numéro de la page actuellement affichée (commence à 0)
   pageSize: number = 5;    // Nombre d'éléments par page
   totalElements:number=0; // totalItems: number = 0;   // Nombre total d'éléments



  constructor(
    private fb: FormBuilder,
    private paginatorService: PaginatorService,
    private proformasService: ProformasService,
    //     this.items = [];
    //   for (let i = 0; i < 10000; i++) {
    //   this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    // }
  ) {

    this.trow = Employee;
  }

   ngOnInit() {
     this.getLoadDevis()
      // this.getProducts(this.currentPage, this.pageSize);

   }

  // ---------------------------------------------------------------------FONCTIONS-----------------------------------------------------------------------
  // getLoadDevis(pageNumber?: number): void {
  //   console.log('Début de la récupération des devis');
  //
  //   this.proformasService.getValuesDevis(pageNumber ?? 0, 10).subscribe({
  //     next: (value) => {
  //       console.log('value', value);
  //
  //       // Suppression de "value.data" car les données sont directement dans "value"
  //       if (value && value.content) {
  //         this.combinedData = value.content; // Récupérer les devis
  //         this.totalItems = value.totalElements; // Total des éléments
  //         this.totalPages = value.totalPages; // Total des pages
  //
  //         console.log('Récupération réussie', value.content);
  //       } else {
  //         console.error('Données inattendues reçues :', value);
  //         this.combinedData = []; // Initialise comme tableau vide si pas de données
  //         this.totalItems = 0; // Mettre à jour le nombre total d'éléments à 0
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la récupération des devis', err);
  //     }
  //   });
  // }
  getLoadDevis(pageNumber: number = 0): void {
    console.log('Début de la récupération des devis');

    this.proformasService.getValuesDevis(pageNumber, 10).subscribe({
      next: (value) => {
        console.log('value', value);
        if (value && Array.isArray(value.content)) {
          const pageData = value;
          this.combinedData = pageData.content; // Récupérer les devis
          this.totalElements = pageData.totalElements; // Total des éléments
          this.totalPages = pageData.totalPages; // Total des pages
          console.log('Récupération réussie', pageData.content);
        } else {
          console.error('Données inattendues reçues :', value);
          this.combinedData = []; // Initialise comme tableau vide si pas de données
          this.totalElements = 0; // Mettre à jour le nombre total d'éléments à 0
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des devis', err);
      }
    });
  }


  // loperateur ternaire (direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  // onQuantityChangeDevis(devis: Devis) {
  //   if (objet.products && objet.products.length > 0) {
  //     objet.products.forEach(objetPro => {
  //       if (objetPro.qte && objetPro.prixUnitaire) {
  //         const total = objet.qte * product.prixUnitaire;
  //         console.log('Total HT pour ce produit:', total);
  //         console.log('Quantité modifiée:', product.qte);
  //       }
  //     });
  //   }
  // }

  // goToNextOrPreviousPage(direction:string):void{
  //   this.getLoadDevis(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  // }
  // // Calculer le nombre total de pages
  // getTotalPages(): number[] {
  //   const totalPages = Math.floor(this.totalElements / this.pageSize);
  //   return Array(totalPages).fill(0).map((x, i) => i); // Crée un tableau avec les index des pages
  // }

  // onPageChange(event: any) {
  //   const newPageIndex = event.page;
  //   this.getLoadDevis(newPageIndex); // Appel de votre fonction pour charger les devis
  // }


  // ----------------------------------FONCTION---------------------------------------------

  load($event: TableLazyLoadEvent) {
    // console.log("$event: ", $event);
    // this.request.first = $event.first || 0;
    // this.request.sortField =$event.sortField || '';
    // this.request.sortOrder = $event.sortOrder || 1
    // this.getLoadDevis()

  }
   selectionClient(client: any):void {
    // const selectedClient = devis.clientId; // Récupérer le client du devis
    const selectedClient = client ? this.client.find(c => c.clientId === client!.clientId): null ;
    if (selectedClient) {
      // const p= parseInt(selectedClient.phone.replace(/\D/g, ''), 10)
      this.proformasService.setClient(selectedClient); // Met à jour le client dans le service
      // VERIFIONS dans les logs si ca recupere le client
      this.proformasService.client$.subscribe({
        next: (value) => console.log('Client sélectionné: ', value)
      })
    } else {
      console.error('Client non trouvé pour le devis:', client);
    }
   }
  selectionProduct(devis: Devis):void {
     const selectedProduct = this.products.filter(product =>devis.productId.includes(product.productId!))
    if(selectedProduct.length>0){
      // COMME CA PASSE UN TABLEAU DE PRODUIT
      // this.proformasService.setProduct(selectedProduct)
       // this.selectedProducts.push(selectedProduct);
       console.log('Produit sélectionné:', selectedProduct);
    }
  }

  updateQuantity(quantite:Devis){
    this.proformasService.setQuantite(quantite);
  }

  onQuantityChange(devis: Devis, event: any): void {
    // if(devis.product){
    //   devis.product.qte = event !== undefined ? event : 0; // Valeur par défaut 0 ou gérez comme nécessaire;
    //   // devis.topSelling.totalHT = event * this.getUnitPrice(devis);
    //   console.log("devis.topSelling.qte: ", devis.product.qte);
    //   if (typeof devis.product.qte === 'number') {
    //     // Envoi de la quantité pour un objet spécifique
    //     this.proformasService.updatequantite(devis.productId, devis.product.qte).subscribe();
    //   }
    // }
  }
  // getUnitPrice(devis: Devis): number {
  //   return devis.product.prixUnitaire || 0;
  // }


  protected readonly state = state;
  protected readonly Math = Math;
}
