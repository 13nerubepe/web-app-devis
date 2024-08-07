import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';
import {Product, } from "../../classes/table-data";
import { ProformasService } from "../../service/proformas.service";
import { AppModule } from "../../app.module";

@Component({
  selector: "app-commande",
  templateUrl: "./commande.component.html",
  styleUrls: ["./commande.component.css"]
})
export class CommandeComponent {
  @Input() isProforma: boolean = false;
  @Input() title: any = '';
  @Input() modalTitle: any = '';

  [x: string]: any;
  commandes: any[] = [];
  allCommandes: any[] = [];
  selectedCommandes: any[] = [];
  ventes: Product[] = [];
  allVentes: any[] = [];
  produits: any[] = [];
  pv: any = {};
  user: any = {};
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  commande: any = {};
  vente: any = {};
  sModelName = 'commande';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;
  currencySymbol: string = 'XAF';
  selectedProduct!:Product;

  constructor(
    private proformasService: ProformasService,
    private dataRestService: DataRestService,
    private modalService: NgbModal,
    private appDataStoreService: AppDataStoreService,
  ) {
    this.pv = this.dataRestService.getOneLocalData("pv");
    this.user = this.dataRestService.getOneLocalData("user");
  }

  ngOnInit(): void {
    this.getProduct();
    this.appDataStoreService.selectedPointVente.subscribe((pointVente: any) => {
      if (pointVente) {
        this.pv = pointVente;
        this.changeCommande();
      }
    });
  }
  getProduct() {
    return this.proformasService.devis
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(
      this.dataRestService.getAll('vente,produit', false, this.sModelName),
      this.dataRestService.getAll('commandes,client,pointVente,caissier', false, 'vente'),
      this.dataRestService.getAll('pointVente', false, 'produit'),
    ).pipe(map(([commandes, ventes, produits]: any[]) => {
      this.allCommandes = commandes
      this.allVentes = ventes;
      this.produits = produits;

      this.changeCommande();
      this.loading = false;
    },
      (err: any) => {
        const message = 'Une erreur s\'est produite. \n' + (err.message || '');
        Swal.fire(message, '', 'error').then();
      })).subscribe(() => { }, (err) => { });
  }

  async onFormSubmit(data: any) {
    event?.preventDefault();

    this.saving = true;
    this.dataRestService.update(data, '', this.sModelName).then(response => {
      if (response.error) throw response;
      setTimeout(() => {
        // On réinitialise le formulaire
        Swal.fire('L\'enregistrement a été effectué avec succès.', '', 'success').then();
        this.closeModal();
        this.loadData();
        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire('L\'enregistrement a échoué. \n' + (error.message || ''), '', 'error').then();
        this.saving = false;
      });
  }

  showModal(data: any, show = true) {
    this.vente = data;
    this.selectedCommandes = this.commandes.filter((commande: any) => commande.vente.id === data.id);
    this.openModal();
    this.isModalOpen = show;
  }

  handleSupprime(data: any) {
    Swal.fire({
      title: 'Êtes vous sûr de vouloir vraiment supprimer?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        autocomplete: 'no'
      },
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'brown',
      showLoaderOnConfirm: true,
      inputPlaceholder: 'Ecrire: delete',
      preConfirm: (inputValue: any) => {
        if (!(inputValue && inputValue.toLowerCase() === 'delete')) {
          Swal.showValidationMessage(`Vous devez entrer&nbsp;<b>delete</b>&nbsp;pour confirmer!`);
          return false;
        }
        return this.dataRestService.delete(data.id || 0, this.sModelName)
          .then(response => {
            this.loadData();
            this.closeModal();
            Swal.fire('La suppression a été effectué avec succès.', '', 'success').then();
          })
          .catch(error => {
            Swal.fire('La suppression a échouée. \n' + (error.message || ''), '', 'error').then();
          });
      },
    }).then();
  }

  openModal() {
    const modalRef = this.modalService.open(this.ngModal);
  }

  closeModal() {
    const modalRef = this.modalService.dismissAll();
  }

  print(data: any) {
    console.log(data);
  }

  changeCommande() {
    this.commandes = this.allCommandes.map((commande: any) => {
      return {
        ...commande,
        ...{
          produit: this.produits.find(
            (produit: any) => produit.id === commande.produit.id && produit.pointVente.id === this.pv.id
          ),
        },
      };
    });
    this.ventes = this.allVentes.filter((d: any) => d.pointVente.id === this.pv.id).map((vente: any) => {
      let total = 0;
      const nbProd = vente.commandes.length;

      vente.commandes.forEach((commande: any) => {
        total += parseInt(commande.total, 10);
      });

      return {
        ...vente,
        ...{
          montant: total,
          quantite: nbProd,
          total,
          reduction: 0,
          tva: 0,
        },
      };
    });

    if (this.isProforma) {
      this.ventes = this.ventes.filter((v: any) => !!!v.etat);
    } else {
      this.ventes = this.ventes.filter((v: any) => !!v.etat);
    }
  }
}
