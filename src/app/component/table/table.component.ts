import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  Product,
  TableRows,
  Employee,
  Devis,
  Client,
  ValeursRequest
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
import { BehaviorSubject, iif, Observable } from "rxjs";
import { state } from "@angular/animations";
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, Button, PrimeTemplate, TableModule, InputNumberModule, SelectButtonModule, DropdownModule, FormsModule, MultiSelectModule, ReactiveFormsModule, NgIf, AsyncPipe],
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
  combinedData: any[]=[];
  // devis = combineLatest([ this.proformasService.getCombinedData(this.request), this.search.controls.nom.valueChanges])
  trow: TableRows[];
  // Variables pour la pagination
  currentPage: number = 0;  // Page courante
  pageSize: number = 5;    // Nombre d'éléments par page
  totalItems: number = 0;   // Nombre total d'éléments
  pagedData: any[] = [];    // Données paginées pour l'affichage



  constructor(
    private fb: FormBuilder,
    private paginatorService: PaginatorService,
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
      // this.getProducts(this.currentPage, this.pageSize);

   }

  // getProducts(page: number, size: number) {
  //   const url = 'http://localhost:8080/api/products';  // Remplacez par l'URL de votre backend
  //   this.paginationService.getPaginatedData<{ items: Product[], totalItems: number }>(url, page, size)
  //     .subscribe(data => {
  //       this.products = data.items;
  //       this.totalItems = data.totalItems;
  //     });
  // }

  // ---------------------------------------------------------------------FONCTIONS-----------------------------------------------------------------------

  getLoadDevis(pageNumber?: number): void{
    console.log();
     this.proformasService.getCombinedData().subscribe({
       next:(value)=>{
         this.combinedData= value;

         this.totalItems = value.length;  // Obtenir le nombre total d'éléments
         this.paginate();  // Appeler la fonction de pagination
         console.log('Récupération réussie', value);
       },
       error: (err) => {
         console.error('Erreur lors de la récupération des devis', err);
       }
     })
  }

  paginate(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.combinedData.slice(start, end);

  }

  onPageChange(event: any): void {
    this.currentPage = event.page;  // Mettre à jour la page courante
    this.paginate();  // Paginer à nouveau les données
  }
  // loperateur ternaire (direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  goToNextOrPreviousPage(direction:string):void{
    this.getLoadDevis(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  }


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
      this.proformasService.setProduct(selectedProduct)
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
}
