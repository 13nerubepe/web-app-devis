export interface Product {
    productId?: number,
    productName?: string,
    image?: string,
    gmail?: string,
    qteenstock?: number,
    unite?: number,
    description?: string,
    libelle: string,
    categories?: string,
    prixUnitaire?: number,
    qte?: number,
    tva?: number,
    totalTva?: number,
    totalHT?: number
}
export interface Client {
  clientId:number;
  image:string;
  nom:string;
  email: string;
  phone: number;
  address: string;
  ville: string;
  grade: string;
}

export interface Devis {
  devisId:number;
  clientId:number;
  productId:number;
  totalHt: number;
  reduction:string;
  tva: number;
  totalTtc: number;
  date:string;
  cassier: string;
  client?: Client; // Ajouter pour l'objet client associé
  topSelling?: Product; // Ajouter pour l'objet produit associé
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
