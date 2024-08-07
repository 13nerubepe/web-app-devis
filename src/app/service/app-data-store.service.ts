import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppDataStoreService {
    // User-specific. Cannot be changed from an app
    private _accountInfo = new BehaviorSubject<any>('');

    // App-specific. Can be changed from the very specific app where it was initially set.
    public openSideMenu = new Subject<any>();
    public allUsers = new BehaviorSubject<any>(null);

    public user = new BehaviorSubject<any>(null);
    private _isLogin = new BehaviorSubject<any>(null);

    private _mediaBtnClicked = new BehaviorSubject<string>("");
    // User-specific. Cannot be changed from an app
    private _userDataByIp = new BehaviorSubject<any>(null);
    private _directCallDid = new BehaviorSubject<any>("");
    private _didNumbers = new BehaviorSubject<any>(null);
    private _callbackNumbers = new BehaviorSubject<any>(null);
    private _showDidNumberCountryList = new BehaviorSubject<boolean>(false);
    private _topupCountries = new BehaviorSubject<any>(null);
    // App-specific. Can be changed from the very specific app where it was initially set.
    private _appAccountSettings = new BehaviorSubject<any>("");
    private _featurePermissions = new BehaviorSubject<any>(null);
    private _moneyPools = new BehaviorSubject<any>(null);
    private _callerId = new BehaviorSubject<any>(null);
    private _virtualKeyboardVisible = new BehaviorSubject<boolean>(false);
    private _pinCode = new BehaviorSubject<any>(null);
    private _eltHeights = new BehaviorSubject<any>(0);
    private _successTransfert = new BehaviorSubject<any>(null);
    private _pageChanged = new Subject<any>();
    private _windowLoaded = new BehaviorSubject<any>(false);
    private _smsReceived = new Subject<any>();
    private _listItems = new Subject<any>();
    private _activeItem = new Subject<any>();
    private _userLocalData = new BehaviorSubject<any>(null);
    private _afpData = new BehaviorSubject<any>(null);
    public openGenericSidePanel = new Subject<any>();
    private _refreshAccountBalance = new Subject<any>();
    // private _languageKey = new BehaviorSubject<any>(
    //   (window as any).localStorage.langKey || "en"
    // );
    private _translation = new Subject<any>();
    private _countriesTelecomData = new BehaviorSubject<any>(null);
    private _activeSaleId = new BehaviorSubject<any>({});
    public refreshSales = new Subject<any>();
    private _printers = new Subject<any[]>();
    private _nearestStores = new BehaviorSubject<any>(null);
    private _initNearestStores = new BehaviorSubject<any>(null);
    private _posSearchString = new BehaviorSubject<any>(null);
    private _appSettings = new BehaviorSubject<any>(null);
    private _shoppingCart = new BehaviorSubject<any>(null);
    private _showCustomModal = new Subject<any>();
    private _annuaire = new BehaviorSubject<any>(null);
    private _showUserActionMenu = new Subject<any>();
    private _action = new Subject<any>();
    private _createStoreAction = new Subject<any>();
    private _addProductAction = new Subject<any>();
    private _showLiveLocation = new Subject<any>();
    private _cartAction = new Subject<any>();
    private _product = new BehaviorSubject<any>(null);
    private _productListData = new BehaviorSubject<any>(null);
    private _relatedProducts = new Subject<any>();
    private _newProductAdded = new Subject<any>();
    private _posData = new BehaviorSubject<any>(null);
    private _storeProducts = new BehaviorSubject<any>(null);
    public _productsSearchCount = new BehaviorSubject<any>(null);
    public searchStr$: any = new Subject<any>();
    public currentCurrency: any = new Subject<any>();
    public productsStoreChange: any = new Subject<any>();
    public locationSearchData: any = new BehaviorSubject<any>(null);
    public selectedCurrency: any = new BehaviorSubject<any>(null);
    public selectedPointVente: any = new BehaviorSubject<any>(null);
    private _customerList = new BehaviorSubject<any[]>([]);
    onSelectedFilterChanged$: BehaviorSubject<any> = new BehaviorSubject(null);
    updateCustomerList$: BehaviorSubject<any> = new BehaviorSubject(null);
    private _activeStores = new BehaviorSubject<any>(null);
    private _pointVente = new BehaviorSubject<any>(null);
    private _pointVentes = new BehaviorSubject<any>(null);
    private _orders = new BehaviorSubject<any>(null);
    showSaleOrderList: any = new BehaviorSubject<any>(false);
    _workOrderList: any = new BehaviorSubject<any>(null);
    updateWorkOrderList$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
    ) { }

    get translation() {
        return this._translation;
    }

    changeActiveStores(data: any) {
        this._activeStores.next(data);
    }

    get activeStores() {
        return this._activeStores;
    }

    changeOrders(data: any) {
        this._orders.next(data);
    }

    get orders() {
        return this._orders;
    }

    changePointVente(data: any) {
        this._pointVente.next(data);
    }

    get pointVente() {
        return this._pointVente;
    }

    changePointVentes(data: any) {
        this._pointVentes.next(data);
    }

    get pointVentes() {
        return this._pointVentes;
    }

    get printers() {
        return this._printers;
    }

    changePrinters(printers: any[]) {
        this._printers.next(printers);
    }

    changeTranslation(translation: any) {
        this._translation.next(translation);
    }

    get countriesTelecomData() {
        return this._countriesTelecomData;
    }

    changeCountriesTelecomData(data: any) {
        this._countriesTelecomData.next(data);
    }

    // get languageKey() {
    //   return this._languageKey;
    // }

    // changeLanguageKey(langKey) {
    //   this._languageKey.next(langKey);
    //   this.storage.set("languageKey", langKey);
    //   const translation = {};
    //   Object.keys(TRANSLATIONS).map((translateKey) => {
    //     translation[translateKey] = TRANSLATIONS[translateKey][langKey];
    //   });

    //   window.localStorage.translation = JSON.stringify(translation);

    //   this.changeTranslation(translation);
    // }

    get afpData() {
        return this._afpData;
    }

    changeAfpData(data: any) {
        this._afpData.next(data);
    }

    get userLocalData() {
        return this._userLocalData;
    }

    get productsSearchCount() {
        return this._productsSearchCount;
    }

    changeUserLocalData(data: any) {
        this._userLocalData.next(data);
    }

    get smsReceived() {
        return this._smsReceived;
    }

    changeSmsReceived(sms: any) {
        this._smsReceived.next(sms);
    }

    get pageChanged() {
        return this._pageChanged;
    }

    get windowLoaded() {
        return this._windowLoaded;
    }

    changeWindowLoaded(value: any) {
        this._windowLoaded.next(value);
    }

    get successTransfert() {
        return this._successTransfert;
    }

    changeSuccessTransfert() {
        const time = new Date().getTime();
        this._successTransfert.next(time);
    }

    get eltHeights() {
        return this._eltHeights;
    }

    changeEltHeights(eltHeights: any) {
        this._eltHeights.next(eltHeights);
    }

    get featurePermissions() {
        return this._featurePermissions;
    }

    changeFeaturePermissions(permissions: any) {
        this._featurePermissions.next(permissions);
    }

    get callerId() {
        return this._callerId;
    }

    changeCallerId(callerId: any) {
        this._callerId.next(callerId);
    }

    changeVirtualKeyboardVisible(visible: boolean) {
        this._virtualKeyboardVisible.next(visible);
    }

    get virtualKeyboardVisible() {
        return this._virtualKeyboardVisible;
    }

    get pinCode() {
        return this._pinCode;
    }

    changePinCode(code: any) {
        this._pinCode.next(code);
    }

    get moneyPools() {
        return this._moneyPools;
    }

    changeMoneyPools(moneyPoolData: any) {
        this._moneyPools.next(moneyPoolData);
    }

    changeMediaBtnClicked(btnId: string) {
        this._mediaBtnClicked.next(btnId);
    }

    get listItems() {
        return this._listItems;
    }

    changeListItems(items: any) {
        this._listItems.next(items);
    }

    get activeItem() {
        return this._activeItem;
    }

    changeActiveItem(item: any) {
        this._activeItem.next(item);
    }

    get accountInfo() {
        return this._accountInfo;
    }

    changeAccountInfo(accountInfo: any) {
        this._accountInfo.next(accountInfo);
    }

    get userDataByIp() {
        return this._userDataByIp;
    }

    changeUserDataByIp(userDataByIp: any) {
        this._userDataByIp.next(userDataByIp);
    }

    get directCallDid() {
        return this._directCallDid;
    }

    changeDirectCallDid(accountInfo: any) {
        this._directCallDid.next(accountInfo);
    }

    get didNumbers() {
        return this._didNumbers;
    }

    changeDidNumbers(numbers: any) {
        this._didNumbers.next(numbers);
    }

    get callbackNumbers() {
        return this._callbackNumbers;
    }

    changeCallbackNumbers(numbers: any) {
        this._callbackNumbers.next(numbers);
    }

    get showDidNumberCountryList() {
        return this._showDidNumberCountryList;
    }

    changeShowDidNumberCountryList(show: any) {
        this._showDidNumberCountryList.next(show);
    }

    get topupCountries() {
        return this._topupCountries;
    }

    changeTopupCountries(countries: any) {
        this._topupCountries.next(countries);
    }

    get appAccountSettings() {
        return this._appAccountSettings;
    }

    changeAppAccountSettings(setting: any) {
        this._appAccountSettings.next(setting);
    }

    changeRefreshAccountBalance() {
        this._refreshAccountBalance.next(1);
    }

    get refreshAccountBalance() {
        return this._refreshAccountBalance;
    }

    get nearestStores() {
        return this._nearestStores;
    }

    changeNearestStores(data: any) {
        this._nearestStores.next(data);
    }

    get initNearestStores() {
        return this._initNearestStores;
    }

    changeInitNearestStores(data: any) {
        this._initNearestStores.next(data);
    }

    changePosSearchString(searchStr: string) {
        this._posSearchString.next(searchStr);
    }

    get posSearchString() {
        return this._posSearchString;
    }

    changeAppSettings(settings: any) {
        this._appSettings.next(settings);
    }

    get appSettings() {
        return this._appSettings;
    }

    changeShoppingCart(data: any) {
        localStorage.setItem("shoppingCart", JSON.stringify(data));

        this._shoppingCart.next(data);
    }

    get shoppingCart() {
        return this._shoppingCart;
    }

    changeShowCustomModal(module: any) {
        this._showCustomModal.next(module);
    }

    get showCustomModal() {
        return this._showCustomModal;
    }

    changeAnnuaire(data: any) {
        this._annuaire.next(data);
    }

    get annuaire() {
        return this._annuaire;
    }

    changeShowUserActionMenu(data: { show: boolean; evt: any }) {
        this._showUserActionMenu.next(data);
    }

    get showUserActionMenu() {
        return this._showUserActionMenu;
    }

    changeCreateStoreActionAction(data: any) {
        this._createStoreAction.next(data);
    }

    get createStoreAction() {
        return this._createStoreAction;
    }

    changeAddProductAction(data: any) {
        this._addProductAction.next(data);
    }

    get addProductAction() {
        return this._addProductAction;
    }

    changeShowLiveLocation(position?: any) {
        this._showLiveLocation.next(position);
    }

    get showLiveLocation() {
        return this._showLiveLocation;
    }

    get action() {
        return this._action;
    }

    updatedAction(param: { item: any; action: string }) {
        this._action.next(param);
    }

    get cartAction() {
        return this._cartAction;
    }

    changeCartAction(data: any) {
        this._cartAction.next(data);
    }

    changeCurrentProduct(product: any) {
        this._product.next(product);
    }

    get currentProduct() {
        return this._product;
    }

    changeProductListData(product: any) {
        this._productListData.next(product);
    }

    get productListData() {
        return this._productListData;
    }

    changeRelatedProducts(product: any) {
        this._relatedProducts.next(product);
    }

    get relatedProducts() {
        return this._relatedProducts;
    }

    changeNewProductAdded(data: any) {
        this._newProductAdded.next(data);
    }

    get newProductAdded() {
        return this._newProductAdded;
    }


    get posData() {
        return this._posData;
    }

    changePosData(posData: {}) {
        this._posData.next(posData);
    }

    get storeProducts() {
        return this._storeProducts;
    }

    changeStoreProducts(data: {}) {
        this._storeProducts.next(data);
    }

    get customerList() {
        return this._customerList;
    }

    changeCustomerList(data: any[]) {
        this._customerList.next(data);
    }

    get workOrderList() {
        return this._workOrderList;
    }

    changeWorkOrderList(data: any[]) {
        this._workOrderList.next(data);
    }

    changeIsLogin(data: any) {
        this._isLogin.next(data);
    }

    get isLogin() {
        return this._isLogin;
    }
}
