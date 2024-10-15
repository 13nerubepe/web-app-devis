import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  ApiResponse,
  Client,
  CreateClient,
  CreateProductDto,
  Devis,
  PageDto,
  Product
} from "../classes/table-data";
import { BehaviorSubject, catchError, combineLatest, forkJoin, map, Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ProformasService{
  private baseUrl = environment.apiUrl;



  formValues: BehaviorSubject<Devis | null> = new BehaviorSubject<Devis | null>(null);
  private clientSource = new BehaviorSubject<Client | null>(null);//Permet de stocker et de diffuser la dernière valeur observée aux nouveaux abonnés.
  private produitSource = new BehaviorSubject<Product[]>([]);
  private quantiteSource = new BehaviorSubject<Devis[]>([]);
  Quantite$ =this.quantiteSource.asObservable();
  Products$ = this.produitSource.asObservable();
  client$ = this.clientSource.asObservable();

  devis: Product[]=[];
  clients: Client[]=[];

  constructor(private _http: HttpClient,) {

  }
  serveDevisS(devis: Product[]){
    this.devis = devis;
  }
  // mettre a jour le client selectionné
  setClient(client: Client) {
    this.clientSource.next(client); // Met à jour le client actuel
  }

  setQuantite(updatedDevis: Devis) {
    let currentDevis = this.quantiteSource.getValue();
    const index = currentDevis.findIndex(d => d.devisId === updatedDevis.devisId);
    if (index !== -1) {
      currentDevis[index] = updatedDevis;
      this.quantiteSource.next(currentDevis);
    }
  }
  updatequantite(productId:any, qte:number): Observable<Product>{
    return this._http.put<Product>(`${this.baseUrl}'devis/${productId}`,{qte}).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError('Something bad happened; please try again later.');
  }
  addClient(addClient: CreateClient): Observable<Client>{
    return this._http.post<Client>(this.baseUrl + 'client/createClient', addClient);
  }

  setProduct(varProduct: Product|Product[]) {
    // Récupère la liste actuelle des produits sélectionnés
    const currentProducts =this.produitSource.value;
    // Assure que varProduct est un tableau
    const productsToAdd = Array.isArray(varProduct) ? varProduct : [varProduct];
    // Crée un Set pour les IDs de produits existants afin d'éviter les doublons
    const existingProductIds = new Set(currentProducts.map(p => p.productId));

    // Ajoute uniquement les produits qui ne sont pas déjà dans la liste
    productsToAdd.forEach(product => {
      if (!existingProductIds.has(product.productId)) {
        currentProducts.push(product);
        existingProductIds.add(product.productId); // Met à jour le Set avec le nouvel ID
      }
    });

    this.produitSource.next(currentProducts);
  }
  creerDevis(devis:any):Observable<any>{
    return this._http.post<any>(this.baseUrl + `devis/createDevis`, devis);

  }
  createClient(newClient: Client):Observable<any>{
    return this._http.post<any>(this.baseUrl +  `client/createClient`, newClient)
  }
  renameClient(newClient:any):Observable<any>{
    return this._http.post<any>(this.baseUrl + ``,newClient)
  }

  // getValuesDevis():Observable<ApiResponse<Page[]>> {
  //   return this._http.get<ApiResponse<Page[]>>(this.baseUrl + `devis/listeDevis`);
  // }
  getValuesDevis(page: number, size: number):Observable<PageDto> {
    return this._http.get<PageDto>(this.baseUrl + `devis/pagination?page=${page}&size=${size}`);
  }
  // getValuesDevis(page: number, size: number): Observable<ApiResponse<PageDto>> {
  //   const url = `${this.baseUrl}/devis/pagination?page=${page}&size=${size}`;
  //   return this._http.get<ApiResponse<PageDto>>(url).pipe(
  //     catchError((error) => {
  //       console.error('Erreur lors de la récupération des devis:', error);
  //       return throwError(() => new Error('Erreur lors de la récupération des devis'));
  //     })
  //   );
  // }

  // recupere LES CLIENTS
  getValuesClient():Observable<Client[]> {
    return this._http.get<Client[]>(this.baseUrl + `client/listeClient`);
  }
  getValuesProduct():Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl + `product/listeProduct`);
  }
  createProduct(createProductDto: CreateProductDto):Observable<Product>{
    return this._http.post<Product>(this.baseUrl + `product/createProduct`, createProductDto );
  }

  // Récupérer les données combinées
  getCombinedData(): Observable<any[]> {
    return forkJoin({
      products: this._http.get<Product[]>(this.baseUrl + `product/listeProduct`),
      clients: this._http.get<Client[]>(this.baseUrl + `client/listeClient`),
      devis: this._http.get<Devis[]>(this.baseUrl + `devis/listeDevis`)
    }).pipe(
      map(({ products, clients, devis }) =>
        devis.map((devis) => {
          const client = clients.find(c => c.clientId === devis.clientId);
          const product = products.find(p => p.productId === devis.productId);
          console.log('Données reçues venant du serveur:', devis);
          return {
            ...devis,
            clientName: client ? client.nom : 'Inconnu',
            productName: product ? product.productName : 'Inconnu'
          };
        })
      )
    );
  }

  // getCombinedData():Observable<Devis[]> {
  //   return forkJoin([
  //     this.getValuesDevis(),
  //     this.getValuesClient(),
  //     this.getValuesProduct(),
  //   ]).pipe(
  //     map(([devis, clients, products]) => {
  //       return devis.map(d => ({
  //         ...d,
  //         // clients: clients,  // Ajoute la liste complète des clients à chaque devis
  //         // topSellings: products,  // Ajoute la liste complète des clients à chaque devis
  //         clients: clients.find(client => client.clientId === d.clientId),
  //         // Trouver tous les produits associés au devis
  //         products: products.filter(product => d.productId.includes(product.productId!))
  //         // products: products.find(product => product.productId === d.productId)
  //        }));
  //     })
  //   );
  // }

}
