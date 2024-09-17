export interface Product {
  productId?: string,
  productName?: string,
  image?: string,
  gmail?: string,
  qteenstock?: number,
  unite?: number,
  description?: string,
  categories?: string,
  prixUnitaire?: number,
  qte?: number,
  tva?: number,
  totalTva?: number,
  totalHT?: number
}

export interface CreateProductDto {
  productName: string;
  image: string;
  description: string;
  categories: string;
  prixUnitaire: number;
  qteenstock: number;
  unite: string;

}

export interface Client {
  clientId:string;
  image:string;
  nom:string;
  email: string;
  phone: string;
  address: string;
  ville: string;
  grade: string;
}
export interface CreateClient {
  image:string;
  nom:string;
  email: string;
  phone: string;
  address: string;
  ville: string;
  grade: string;
}


export interface Devis {
  devisId:string;
  clientId:string;
  productId:string[];
  totalHt: number;
  reduction:string;
  tva: number;
  totalTtc: number;
  date:string;
  cassier: string;
  client?: Client; // Ajouter pour l'objet client associé
  products?: Product[]; // Ajouter pour l'objet produit associé
}
export interface ValeursRequest {
  first: number,
  rows:number,
  sortField: string | string[],
  sortOrder: number

}
export interface TableRows {
  fname: string,
  lname: string,
  uname: string,
}

// -------------------------------------------OBJETS-----------------------------------------------

export const TopSelling: Product[] = [

]

// export const client: Client[]=[]

export const Employee : TableRows[] = [
    {
        fname: "Mark",
        lname: "Otto",
        uname: "@mdo",
    },
    {
        fname: "Jacob",
        lname: "Thornton",
        uname: "@fat",
    },
    {
        fname: "Larry",
        lname: "the Bird",
        uname: "@twitter",
    }
]
