import { Injectable } from "@angular/core";
import { get } from "lodash";
import { AppDataStoreService } from "./app-data-store.service";
import { DataRestService } from "./data-rest.service";
import { UtilsService } from "./utils.service";

@Injectable({ providedIn: "root" })
export class CartService {
  cartData: any = {};
  cartTotal: any = 0;
  _cartTotalWithTax: any = 0;
  userCurrency: any = "";
  _shippingFormValues: any = {};
  checkoutPaymentData: any = {};

  constructor(
    private appDataStoreService: AppDataStoreService,
    private dataRestService: DataRestService,
  ) {
    this.cartData = dataRestService.getOneLocalData("shoppingCart") || {};
  }

  get cartTotalWithTax() {
    return this._cartTotalWithTax;
  }

  set cartTotalWithTax(value) {
    this._cartTotalWithTax = value;
  }

  get shippingFormValues() {
    return this._shippingFormValues;
  }

  set shippingFormValues(value) {
    this._shippingFormValues = value;
  }

  get itemCount() {
    if (!this.cartData) { return Promise.resolve(0); }

    const cartData = this.cartData;
    const storeKeys = Object.keys(cartData);
    let count = 0;
    storeKeys.forEach((storeKey) => {
      Object.keys(cartData[storeKey].cart).forEach((key) => {
        count += cartData[storeKey].cart[key].quantity;
      });
    });

    return count;
  }

  get storeKeys() {
    return Object.keys(this.cartData);
  }

  removeFromCart(store: any, product: any) {
    this.appDataStoreService.changeCartAction({
      store,
      product,
      action: "remove",
    });
    const storeKey = store.id;
    const itemKey = UtilsService.getProductId(product); // product.id;
    if (
      !(
        this.cartData[storeKey] &&
        this.cartData[storeKey].cart &&
        Object.keys(this.cartData[storeKey].cart).length > 0
      )
    ) {
      delete this.cartData[storeKey];
      this.updateCart();
      return;
    }

    if (this.cartData[storeKey].cart[itemKey]) {
      const qty = parseInt(this.cartData[storeKey].cart[itemKey].quantity, 10) || 0;

      if (qty > 1) {
        this.cartData[storeKey].cart[itemKey].quantity = qty - 1;
      } else {
        delete this.cartData[storeKey].cart[itemKey];
      }
    }

    this.updateCart(storeKey);
  }

  directQtyUpdate(product: any) { }

  addToCart(store: any, product: any, prepend?: any) {
    const storeKey = store ? store.id : 0;
    if (!(store && storeKey)) {
      return;
    }

    this.appDataStoreService.changeCartAction({
      store,
      product,
      prepend,
      action: "add",
    });

    if (!this.cartData[storeKey]) {
      this.cartData[storeKey] = { cart: {}, store };
    }

    if (!(this.cartData[storeKey] && this.cartData[storeKey].cart)) {
      this.cartData[storeKey].cart = {};
    }

    this.cartData[storeKey].store = { ...this.cartData[storeKey].store, ...store };

    const id = UtilsService.getProductId(product);

    if (!(this.cartData[storeKey] && this.cartData[storeKey].cart && this.cartData[storeKey].cart[id])) {
      this.cartData[storeKey].cart[id] = { product, quantity: 0 };
    }

    if (prepend) {
      const copy = { ...{}, ...this.cartData[storeKey].cart[id] };
      delete this.cartData[storeKey].cart[id];
      this.cartData[storeKey].cart[id] = copy;
    }

    this.cartData[storeKey].cart[id].quantity = (parseInt(this.cartData[storeKey].cart[id].quantity, 10) || 0) + 1;

    this.updateCart(storeKey);
  }

  updateCart(storeKey?: any, tax = 0) {
    if (storeKey) {
      this.cartData[storeKey].cartSummary = UtilsService.cartSummary(this.cartData[storeKey].cart);
    }

    this.appDataStoreService.changeShoppingCart(this.cartData);
  }

  setCartTotal() {
    this.appDataStoreService.userLocalData.subscribe((resp: any) => {
      if (resp) {
        const { rates, userDataByIp } = resp;
        const storeKeys = Object.keys(this.cartData);
        this.userCurrency = userDataByIp.currency;
        this.cartTotal = 0;

        // const shippingCost = get(this.shippingFormValues, `shippingCost`) || [];

        // let shipping = 0;
        // shippingCost.forEach(shippingData => {
        //   const cost = UtilsService.convertCurrency(
        //     shippingData.cost,
        //     shippingData.currency,
        //     userDataByIp.currency,
        //     rates
        //   );

        //   shipping += parseFloat(cost);
        // });

        this.cartTotalWithTax = 0;

        storeKeys.forEach((storeKey) => {
          if (Object.keys(this.cartData[storeKey].cart).length > 0) {
            const tax = (get(this.shippingFormValues, `taxRate[${storeKey}]`) || 0) / 100;
            this.updateCart(storeKey, tax);

            const totalPrice = this.cartData[storeKey].cartSummary.totalPrice;
            const totalPriceWithTax = this.cartData[storeKey].cartSummary.totalPriceWithTax;
            const currency = this.cartData[storeKey].cartSummary.currency;

            // const convertedTotal: any = UtilsService.convertCurrency(
            //   totalPrice,
            //   currency,
            //   userDataByIp.currency,
            //   rates
            // );

            // const convertedTotalWithTax: any = UtilsService.convertCurrency(
            //   totalPriceWithTax,
            //   currency,
            //   userDataByIp.currency,
            //   rates
            // );

            this.cartTotal += parseFloat(`${totalPrice}`); //parseFloat(`${convertedTotal}`);
            this.cartTotalWithTax += parseFloat(`${totalPriceWithTax}`); //(parseFloat(`${convertedTotalWithTax}`) + shipping);
          }
        });

        this.checkoutPaymentData = this.getCheckoutPaymentData();

      }
    });
  }

  getCheckoutPaymentData() {
    const amount = this.cartTotalWithTax;
    const currency = this.userCurrency;

    return {
      amount,
      currency,
      reason: `Total with Tax and Shipping`,
      showReason: true,
      partner_txn_id: `${new Date().getTime()}`,
      seller_email: "services@jetcamer.com", // Very important: Verify in the callback that the payee email is same one before shipping the product. A hacker can manually change it here but cannot modify it in the callback payload since it's a Server 2 Server communication
      mode: "live", // live | test => in test mode, the accounts balance will not be affected
      shipping: this.shippingFormValues,
    };
  }

  clearCart() {
    this.cartData = {};
    this.appDataStoreService.changeShoppingCart({});
  }

  getCartKeys(storeKey: any) {
    const cart = this.cartData[storeKey].cart;
    return Object.keys(cart);
  }

  clearStoreCart(storeIds: any = []) {
    storeIds.forEach((storeKey: any) => {
      this.cartData[storeKey].cart = {};
    });

    this.updateCart();
  }

  saveOrder(pvId?: any) {
    const saleItems: any = [];

    const keys = pvId ? [`${pvId}`] : this.storeKeys;

    keys.map((storeKey, i) => {
      const storeName = this.cartData[storeKey].store.company;
      const storeItemKeys = this.getCartKeys(storeKey);

      for (const itemKey of storeItemKeys) {
        const storeItem = this.cartData[storeKey].cart[itemKey];
        const item = {
          ...storeItem,
          ... {
            payer: this.dataRestService.getOneLocalData("client").id,
            seller: this.cartData[storeKey].cart[itemKey].product.user_id,
            storeName,
            status: 0
          }
        };

        saleItems.push(item);
      }
    });

    return new Promise((resolve, reject) => {
      // this.dataRestService
      //   .secureServiceCrud({
      //     path: "pos",
      //     action: "savePaymentNew",
      //     token: this.authFormService.token || "0",
      //     data: { mid: this.authFormService.memberID, cart: this.cartData, saleItems },
      //   })
      //   .subscribe((resp: any) => {
      //     if (resp.success) {
      //       resolve(resp);
      //     } else {
      //       reject(resp);
      //     }
      //   },
      //     (err: any) => {
      //       reject(err);
      //     }
      //   );
    });
  }
}
