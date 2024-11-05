export interface Product {
  productId?: string,
  image?: string,
  productName?: string,
  libele?: string,
  unite?: string,
  description?: string,
  prixUnitaire?: number,
  qteenstock?: number,
  categories: string,
  tva?: number,
  totalTva?: number,
  totalHT?: number
}

export interface CreateProductDto {
  productName: string;
  image: string;
  libele:string;
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
  password:string;
}

export interface ApiResponse<T> {
  timeStamp: string;
  statusCode: number;
  status: string;  // Par exemple, "success" ou "error"
  message?: string; // Un message optionnel, utile pour décrire une erreur
  // TYPE GENERIQUE
  donnee: T; // Les données réelles retournées par l'API (ici, PageDto)
}

export interface PageDto {
  content: Devis[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  last: boolean;
  first: boolean;
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
export interface Objet {
  totalHt: number;
  reduction:string;
  qte?: number,
  date:string;
  cassier: string;
  client?: Client; // Ajouter pour l'objet client associé
  products: Product[];
  image?: string,
  productName?: string,
  libele?: string,
  unite?: string,
  description?: string,
  prixUnitaire?: number,
  qteenstock?: number,
  categories: string,
  tva?: number,
  totalTva?: number,
  totalHT?: number
}


export interface Devis {
  devisId:string;
  clientId:string;
  productId:string;
  totalHt: number;
  reduction:string;
  totalTva:number;
  qte?: number,
  // tva: number;
  // totalpar objet productotal
  date:string;
  cassier: string;
  client?: Client; // Ajouter pour l'objet client associé
  products?: Product[]; // Ajouter pour l'objet produit associé
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
