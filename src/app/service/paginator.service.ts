import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PaginatorService{
  // suivie de la page actuelle
  private currentPage = new BehaviorSubject<number>(1);
//   nbre delement par page
  itemsPerpage:number =5;
  // Suivi du nombre total d'éléments

private totalItems:BehaviorSubject<number> =new BehaviorSubject<number>(0)

  constructor(private _http: HttpClient,) {

  }

  // Méthode générique pour récupérer des données paginées
  getPaginatedData<T>(url: string, page: number, size: number, sortBy?: string,sortOrder: 'asc' | 'desc' = 'asc' ): Observable<T> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    if (sortBy) {
      params = params.set('sortBy', sortBy).set('sortOrder', sortOrder);
    }

    return this._http.get<T>(url, { params });
  }
}
