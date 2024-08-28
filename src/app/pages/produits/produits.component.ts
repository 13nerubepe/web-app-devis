import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import { Client, Product } from "../../classes/table-data";
import { ProformasService } from "../../service/proformas.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],
})
export class ProduitsComponent {
  // [x: string]: any;
  products: Product[] = [];
  userProductSelected = new Array<Product>()
  DevisDialog: boolean = false;
  //
  // _produits: any[] = [];
  // categories: any[] = [];
  // pv: any = {};
  // isModalOpen: boolean = false;
  // loading: boolean = true;
  // saving: boolean = false;
  // produit: any = {
  //   titre: null,
  //   code: null,
  //   shortLabel: null,
  //   categorie: {},
  // };
  // // producttopSelling!   : Product[];
  // categorie_id: any;
  // sModelName = 'produit';
  // @ViewChild('ngModal', { static: false })
  // ngModal!: ElementRef;
  // mpForm!: FormGroup;
  // image: any;
  // file: any;
  // worksheet: any;
  // arrayBuffer: any;

  // showProductQuickAction = false;
  // selectedProduct: Product | undefined;
  // actionSelectedProduct: Product | undefined

  constructor(
    // private dataRestService: DataRestService,
    private proformasService: ProformasService,
    // private modalService: NgbModal,
    // private appDataStoreService: AppDataStoreService,
  ) { }

  ngOnInit(): void {
    // this.appDataStoreService.selectedPointVente.subscribe((pointVente: any) => {
    //   if (pointVente) {
    //     this.pv = pointVente;
    //     this.loadData();
    //   }
    // });


    // this.pv = this.dataRestService.getOneLocalData('pv');
    //
    // this.mpForm = new FormGroup({
    //   id: new FormControl(0),
    //   description: new FormControl(''),
    //   libelle: new FormControl('', Validators.required),
    //   categorie: new FormControl('', Validators.required),
    //   prixVente: new FormControl('', Validators.required),
    //   prixAchat: new FormControl('', Validators.required),
    //   quantite: new FormControl('', Validators.required),
    // });
    this.getProduct()
  }

  getProduct(){
    this.proformasService.getValuesProduct().subscribe({
      next:(value)=>{
        this.products = value
      }
    })
  }
  handleFiltreCategorie(value: Product) {
    //   this.categorie_id = parseInt(value);
    //   const produits = this._produits;
    //   this.products = this._produits;
    //   if (this.categorie_id) {
    //     this.products =
    //       produits.filter((e) => e?.categorie.id === this.categorie_id) || null;
    //   }
  }
  // // selectionner les products
  // validationProduct(devis: Product[]) {
  //   this.proformasService.serveDevisS(devis);
  //
  // }
  //
  // ngAfterViewInit(): void {
  //   this.loadData();
  // }
  //
  // loadData() {
  //   this.loading = true;
  //   combineLatest(
  //     this.dataRestService.getAll(
  //       'categorie,pointVente,stockPointVentes',
  //       false,
  //       this.sModelName
  //     ),
  //     this.dataRestService.getAll('', false, 'categorie')
  //   )
  //     .pipe(
  //       map(
  //         ([produits, categories]: any[]) => {
  //
  //           this.products = produits.filter((p: any) => p.pointVente.id === parseInt(this.pv.id, 10));
  //           this._produits = produits.filter((p: any) => p.pointVente.id === parseInt(this.pv.id, 10));
  //           this.categories = categories;
  //           this.loading = false;
  //         },
  //         (err: any) => {
  //           const message =
  //             "Une erreur s'est produite. \n" + (err.message || '');
  //           Swal.fire(message, '', 'error').then();
  //         }
  //       )
  //     )
  //     .subscribe(
  //       () => { },
  //       (err) => { }
  //     );
  // }
  //
  // async onFormSubmit() {
  //   event?.preventDefault();
  //
  //   // Vérifications
  //   if (!this.mpForm.valid) {
  //     Swal.fire('Renseigner tous les champs', '', 'warning').then();
  //     return;
  //   }
  //
  //   this.saving = true;
  //   // Traitement
  //   let pTraitement: Promise<any>;
  //   const value = {
  //     ...this.produit,
  //     ...this.mpForm.value,
  //     ...{ image: this.image, pv: this.pv.id },
  //   };
  //
  //   if (value.id) {
  //     // Mode modif
  //     pTraitement = this.dataRestService.update(value, '', this.sModelName);
  //   } else {
  //     // Mode enregistrement
  //     pTraitement = this.dataRestService.save(this.sModelName, value);
  //   }
  //   pTraitement
  //     .then((response) => {
  //       if (response.error) throw response;
  //       setTimeout(() => {
  //         // On réinitialise le formulaire
  //         this.saving = false;
  //         Swal.fire(
  //           "L'enregistrement a été effectué avec succès.",
  //           '',
  //           'success'
  //         ).then();
  //         this.closeModal();
  //         this.loadData();
  //       }, 2000);
  //     })
  //     .catch((error) => {
  //       Swal.fire(
  //         "L'enregistrement a échoué. \n" + (error.message || ''),
  //         '',
  //         'error'
  //       ).then();
  //       this.saving = false;
  //     });
  // }
  //
  // showModal(show = true, data: any | null = null) {
  //   this.produit = {};
  //   if (data) {
  //     this.produit = data;
  //     this.produit = {
  //       ...this.produit,
  //       ...{ categorie: this.produit?.categorie.id },
  //       ...{ pv: this.pv?.id },
  //     };
  //   }
  //   this.mpForm.patchValue(this.produit);
  //
  //   this.openModal();
  //   this.isModalOpen = show;
  // }
  //
  // handleSupprime(data: any) {
  //   Swal.fire({
  //     title: 'Êtes vous sûr de vouloir vraiment supprimer?',
  //     input: 'text',
  //     inputAttributes: {
  //       autocapitalize: 'off',
  //       autocomplete: 'no',
  //     },
  //     reverseButtons: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Delete',
  //     confirmButtonColor: 'brown',
  //     showLoaderOnConfirm: true,
  //     inputPlaceholder: 'Ecrire: delete',
  //     preConfirm: (inputValue: any) => {
  //       if (!(inputValue && inputValue.toLowerCase() === 'delete')) {
  //         Swal.showValidationMessage(
  //           `Vous devez entrer&nbsp;<b>delete</b>&nbsp;pour confirmer!`
  //         );
  //         return false;
  //       }
  //       return this.dataRestService
  //         .delete(data.id || 0, this.sModelName)
  //         .then((response) => {
  //           this.loadData();
  //           this.closeModal();
  //           Swal.fire(
  //             'La suppression a été effectué avec succès.',
  //             '',
  //             'success'
  //           ).then();
  //         })
  //         .catch((error) => {
  //           Swal.fire(
  //             'La suppression a échouée. \n' + (error.message || ''),
  //             '',
  //             'error'
  //           ).then();
  //         });
  //     },
  //   }).then();
  // }
  //
  // openModal() {
  //   const modalRef = this.modalService.open(this.ngModal);
  // }
  //
  // closeModal() {
  //   this.mpForm.reset();
  //   const modalRef = this.modalService.dismissAll();
  // }
  //

  //
  // loadImage(event: any) {
  //   this.image = event;
  // }
  //
  // getFile(event: any) {
  //   this.file = event.target.files[0];
  //
  //   const classe = {
  //     libelle: null,
  //     description: null,
  //     categorie: null,
  //   };
  //
  //   this.fileReader(this.file, classe);
  // }
  //
  // private fileReader(file: any, line: any) {
  //   let fileReader = new FileReader();
  //
  //   fileReader.onload = (e) => {
  //     this.arrayBuffer = fileReader.result;
  //     const data = new Uint8Array(this.arrayBuffer);
  //     const arr = new Array();
  //
  //     for (let i = 0; i !== data.length; i++) {
  //       arr[i] = String.fromCharCode(data[i]);
  //     }
  //
  //     const bstr = arr.join('');
  //     const workbook = xlsx.read(bstr, { type: 'binary', cellDates: true });
  //     const first_sheet_name = workbook.SheetNames[0];
  //
  //     const worksheet = workbook.Sheets[first_sheet_name];
  //     this.worksheet = xlsx.utils.sheet_to_json(worksheet, { raw: true });
  //
  //     /**
  //      * Call matching function
  //      */
  //     this.matchingCell(this.worksheet, line);
  //   };
  //
  //   fileReader.readAsArrayBuffer(file);
  // }
  //
  // matchingCell(worksheet: any, line: any) {
  //   let monTab: any = [];
  //
  //   for (let i = 0; i < worksheet.length; i++) {
  //     const worksheetLine = worksheet[i];
  //     const updatedLine = {
  //       libelle: worksheetLine['LIBELLE'],
  //       description: worksheetLine['DESCRIPTION'],
  //       categorie: worksheetLine['CATEGORIE'],
  //     };
  //     line = { ...line, ...updatedLine };
  //     monTab.push(line);
  //   }
  //
  //   Swal.fire({
  //     title: 'NOMBRE DE PRODUITS: ' + monTab.length,
  //     input: 'text',
  //     reverseButtons: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Enregistrer',
  //     confirmButtonColor: 'green',
  //     showLoaderOnConfirm: true,
  //     preConfirm: (inputValue: any) => {
  //       return console.log(monTab);
  //     },
  //   }).then();
  // }
}
