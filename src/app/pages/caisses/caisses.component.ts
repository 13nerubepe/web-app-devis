import { ChangeDetectorRef, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get, uniqBy } from 'lodash';
import { Subscription, combineLatest, map } from 'rxjs';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { CartService } from 'src/app/service/cart.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import { UtilsService } from 'src/app/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caisses',
  templateUrl: './caisses.component.html',
  styleUrls: ['./caisses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaissesComponent {
  [x: string]: any;
  caisses: any[] = [];
  categories: any[] = [];
  allCategories: any[] = [];
  pointVentes: any[] = [];
  allPointVentes: any[] = [];
  produits: any[] = [];
  allProduits: any[] = [];
  clients: any[] = [];
  stockPointVentes: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  caisse: any = {};
  sModelName = 'caisse';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  mpForm!: FormGroup;

  topcards: any[] = [];
  pv: any = {};
  user: any = {};
  client: any;
  pvId: any;
  currencySymbol: string = 'XAF';
  selectedCategory: any;
  selectedModePayment: any;
  searchString: any = '';
  selectedProducts: any = [];
  filterTm: any;
  @ViewChild('categoryContainerTop') categoryContainerTop: any;
  subs: Subscription = new Subscription();

  currentNumber: any = '0';
  firstOperand: any = null;
  operator: any = null;
  waitForSecondNumber: any = false;
  amount = '';
  dataType = '';
  difference: any;
  maxValue: any;
  lastKey: any;
  modePayments: any = [
    { titre: 'Espèces', value: 1 },
    { titre: 'Mobile', value: 2 },
    { titre: 'Carte', value: 3 },
  ];
  type: string = 'caisse';
  isProforma: boolean = false;

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal,
    private cartService: CartService,
    private appDataStoreService: AppDataStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
    this.pv = this.dataRestService.getOneLocalData('pv');

  }

  get cart() {
    return get(this.cartService, `cartData[${this.pv.id}].cart`);
  }

  set cart(data: any) {
    this.cartService.cartData[this.pv.id] = this.cartService.cartData[this.pv.id] || {};
    this.cartService.cartData[this.pv.id].cart = data;
  }

  get cartItemKeys() {
    if (!this.cart) { return []; }
    return uniqBy(Object.keys(this.cart), (key) => key).reverse();
  }

  getPrice(uniquePrice: any, quantity: any) {
    return (parseFloat(uniquePrice) * parseFloat(quantity)).toFixed(2);
  }

  get cartSummary(): any {
    const cart = get(this.cartService, `cartData[${this.pv.id}].cart`) || {};
    const taxRates = get(this.pv, 'taxRates') || [];

    return UtilsService.cartSummary(cart, taxRates);
  }

  ngOnInit(): void {
    this.loading = true;

    const user = this.dataRestService.getOneLocalData('user');
    if (!(user && user.id)) {
      this.router.navigate(['/login']);
    }
    this.user = user;

    this.appDataStoreService.selectedPointVente.subscribe((pointVente: any) => {
      if (pointVente) {
        this.pv = pointVente;
        this.cartData();
        this.pointVentProduits();
      }
    });
  }

  cartData() {
    const cartData = this.dataRestService.getOneLocalData('shoppingCart');
    setTimeout(() => {
      if (this.pv) {
        this.cart = ((cartData || {})[this.pv.id] || {}).cart || {};
      }
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    combineLatest(
      this.dataRestService.getAll('categorie,pointVente', false, 'produit'),
      this.dataRestService.getAll('pointVente', false, 'categorie'),
      this.dataRestService.getAll('pointvente', false, 'user'),
    ).pipe(map(([produits, categories, users]: any[]) => {
      this.clients = users.filter((user: any) => !(user.grade) || (parseInt(user.grade, 10) === 0 && user.pointvente.id === parseInt(this.pv.id, 10)));

      this.allProduits = produits;
      this.allCategories = categories;
      this.pointVentProduits();
    },
      (err: any) => {
        const message = 'Une erreur s\'est produite. \n' + (err.message || '');
        Swal.fire(message, '', 'error').then();
      })).subscribe(() => { }, (err) => { });
  }

  payNow(show = true, data: any = null) {

    if (this.cartItemKeys.length === 0) {
      return Swal.fire('Le panier est vide!').then();
    }

    this.type = 'caisse';
    this.openModal(this.ngModal);
    return this.isModalOpen = show;
  }

  showModal(isProforma: any) {
    this.type = 'commande';
    this.openModal(this.ngModal);
    this.isProforma = isProforma;
    return this.isModalOpen = true;
  }

  openModal(modal: any) {
    const modalRef = this.modalService.open(modal);
  }

  closeModal() {
    this.selectedModePayment = null;
    this.currentNumber = 0;
    this.client = null
    const modalRef = this.modalService.dismissAll();
  }

  addToCart(product: any, prepend?: any, evt?: any) {
    const pv = this.pv || {} as any;
    this.cartService.addToCart({ id: pv.id, company: pv.nom, currency: this.currencySymbol }, product, prepend);
  }

  setSelectedCategory(categoryId: any, isInit = false) {
    this.searchString = '';
    if (isInit || categoryId !== this.selectedCategory) {
      this.selectedCategory = categoryId;
      this.selectedProducts = this.produits.filter((item) => item.categorie.id === categoryId);
    } else {
      this.selectedCategory = null;
      this.selectedProducts = this.produits.slice(); // shuffle(this.products.slice());
    }
  }

  scrollCategories(direction: any) {
    if (direction === 'right') {
      this.categoryContainerTop.nativeElement.scrollLeft += 50;
    }

    if (direction === 'left') {
      this.categoryContainerTop.nativeElement.scrollLeft -= 50;
    }
  }

  async directQtyUpdate(ev: any, product: any = {}, type = '') {
    this.cartService.directQtyUpdate(product);
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart({ id: this.pv.id }, product);
  }

  formattedAmount(amount: any) {
    const symbolPart = (this.transformCurrency(
      0,
      this.currencySymbol,
      'symbol',
      '2.0'
    ) || '').replace(/0/gi, '');
    const value = (this.transformCurrency(
      amount,
      this.currencySymbol,
      'symbol',
      '2.0'
    ) || '').replace(new RegExp(symbolPart, 'gi'), '');
    return `${value}`.replace(/\D/g, ' ').trim();
  }

  transformCurrency(
    amount: any,
    currencyCode: any,
    display = 'symbol',
    digitInfo = '1.2-2',
    local = 'en-US'
  ) {
    const value = !!!parseFloat(amount) ? 0 : amount;
    return value
    // return this.currencyPipe.transform(
    //   value,
    //   currencyCode,
    //   display,
    //   digitInfo,
    //   local
    // );
  }

  clearCart() {
    this.cart = {};
    this.cartService.cartData[this.pv.id] = {};
    const currentShoppingCart = this.appDataStoreService.shoppingCart.value || {};
    delete currentShoppingCart[this.pv.id];
    this.dataRestService.setOneLocalData(currentShoppingCart, 'shoppingCart');
    this.appDataStoreService.changeShoppingCart(currentShoppingCart);
  }

  onFilterChange(evt: any, target: any) {
    if (evt) { evt.preventDefault(); }
    const str = target.value;
    if (str) {
      if (this.filterTm) {
        clearTimeout(this.filterTm);
      }
      this.filterTm = setTimeout(() => {
        this.selectedProducts = this.getFilteredProducts(str);
      }, 500);
    } else {
    }
  }

  getFilteredProducts(str: any) {
    return this.produits.filter((item) => {
      const name = item.libelle
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const search = str
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return new RegExp(search, 'gi').test(name);
    });
  }

  searchProd(evt: any, target: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onFilterChange(evt, target);
  }

  getNumber(v: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  keypadClick(key: any, source: string) {
    if (source === 'RIGHT_CONTROL') {
      let length = 1;
      if (this.dataType === 'float') {
        this.currentNumber = parseFloat(this.currentNumber).toFixed(2);
        const lastChar = this.currentNumber.split('')[this.currentNumber.length - 1];

        // Only check value, not type
        if (parseInt(this.currentNumber, 10) == parseFloat(this.currentNumber)) {
          length = 4;
        } else if (lastChar === '.' || lastChar === '0' || !lastChar) {
          length = 2;
        }
      }

      this.currentNumber = this.currentNumber.substr(0, this.currentNumber.length - length);

    } else if (source === 'NUMERIC_KEY') {
      if (this.maxValue && parseFloat(this.currentNumber + key) > this.maxValue) {
        return;
      }

      if (!this.lastKey) {
        this.currentNumber = '0';
        this.lastKey = key;
      }

      this.currentNumber += key;
    } else if (source === 'LEFT_CONTROL') {
      this.currentNumber = '0';
    } else if (source === 'DECIMAL_KEY') {
      if (this.dataType !== 'float') {
        return;
      } else {
        this.currentNumber += key;
      }
    }

    this.currentNumber = !!this.currentNumber ? this.currentNumber : '0';

    if (this.dataType !== 'float') {
      this.currentNumber = `${parseInt(this.currentNumber, 10)}`;
    }

    this.difference = this.cartSummary.totalPrice - this.currentNumber;
    // this.keyPressAction.next(this.amount);
  }

  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  clear() {
    this.currentNumber = '0';
    this.difference = null
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  save() {
    const data: any = {};
    let commandes: any[] = [];
    this.cartItemKeys.forEach(itemKey => {
      const produit = this.cart[itemKey]?.product.id;
      const pu = this.cart[itemKey]?.product.prixVente;
      const quantite = this.cart[itemKey]?.quantity;
      const montant = pu;
      const total = pu * quantite;
      commandes.push({ produit, pu, montant, quantite, total })
    });

    data.commandes = commandes;
    data.pv = this.pv.id;
    data.client = this.client;
    data.caissier = this.user.id;
    data.modePayment = this.selectedModePayment;
    data.total = this.cartSummary.totalPrice;
    data.totalPayer = this.currentNumber;

    // Vérifications     
    if (commandes.length === 0) {
      Swal.fire('Renseigner tous les champs', '', 'warning').then();
      return;
    }
    if (!this.client) {
      Swal.fire('Sélectionner un client', '', 'warning').then();
      return;
    }

    if (this.currentNumber === 0 && this.selectedModePayment) {
      Swal.fire('Renseigner le montant payer', '', 'warning').then();
      return;
    }

    this.saving = true;
    // Mode enregistrement
    this.dataRestService.save('commande', data).then(response => {
      if (response.error) throw response;
      setTimeout(() => {
        // On réinitialise le formulaire
        Swal.fire('L\'enregistrement a été effectué avec succès.', '', 'success').then();
        this.closeModal();
        this.loadData();
        this.clearCart();
        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire('L\'enregistrement a échoué. \n' + (error.message || ''), '', 'error').then();
        this.saving = false;
      });
  }

  pointVentProduits() {
    this.loading = true;

    this.produits = this.allProduits.filter((produit: any) => produit.pointVente && (produit.prixVente || 0) > 0 && produit.pointVente.id === this.pv.id);
    this.allCategories = this.allCategories.map(element => {
      return { ...element, ...{ produits: this.produits.filter((item) => item.categorie.id === element.id && item.prixVente) } }
    });
    this.categories = this.allCategories.filter((c: any) => c.pointVente.id === this.pv.id);

    this.selectedProducts = this.produits;
    this.loading = false;
  }
}
