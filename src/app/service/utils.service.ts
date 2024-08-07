//eslint-disable-line no-bitwise
// import * as CryptoJS from "crypto-js";
// import * as moment from "moment";
// import { Platform } from "@ionic/angular";
// import Pica from "pica";

export class UtilsService {
  // static PREFERENCE_KEY = "selectedCurrency";
  // static dayMonthYearFormat = "DD/MM/YYYY";
  // static pickContactNumber(
  //   event,
  //   field,
  //   form,
  //   popoverController,
  //   callback = null
  // ) {
  //   const gNavigator: any = (window as any).navigator as any;
  //   if (!gNavigator.contacts) {
  //     return;
  //   }

  //   gNavigator.contacts.pickContact(
  //     (contact) => {
  //       const phoneNumbers = contact.phoneNumbers;
  //       const l = phoneNumbers.length;
  //       if (l > 1) {
  //         // show popover
  //         const pnumbers = phoneNumbers.map((item) => item.value);
  //         if (field && form) {
  //           this.didContactNumbers(
  //             event,
  //             pnumbers,
  //             field,
  //             form,
  //             popoverController
  //           );
  //         }
  //       } else {
  //         const phone = phoneNumbers[0].value;
  //         if (field && form) {
  //           this.setPhoneNumberToCall(phone, field, form);
  //         }
  //       }

  //       if (typeof callback === "function") {
  //         callback(phoneNumbers);
  //       }
  //     },
  //     (err) => {
  //       console.log("Error: " + err);
  //     }
  //   );
  // }

  // static guid(): string {
  //   const s4 = () => {
  //     return Math.floor((1 + Math.random()) * 0x10000)
  //       .toString(16)
  //       .substring(1);
  //   };

  //   const newGuid =
  //     s4() +
  //     s4() +
  //     "-" +
  //     s4() +
  //     "-" +
  //     s4() +
  //     "-" +
  //     s4() +
  //     "-" +
  //     s4() +
  //     s4() +
  //     s4();
  //   return newGuid;
  // }

  // static generateUID(mid = "0000") {
  //   // I generate the UID from two parts here
  //   // to ensure the random number provide enough bits.
  //   let firstPart: any = (Math.random() * 46656) | 0;
  //   let secondPart: any = (Math.random() * 46656) | 0;
  //   firstPart = (`${mid}` + firstPart.toString(36)).slice(-3);
  //   secondPart = (`${mid}` + secondPart.toString(36)).slice(-3);
  //   return firstPart + secondPart;
  // }

  // static async didContactNumbers(ev, numbers, field, form, popoverController) { }

  // static setPhoneNumberToCall(pnumber, field = "phone", form) {
  //   form.get(field).setValue(pnumber);
  // }

  // static async presentToastWithOptions(
  //   msg = "",
  //   toastController,
  //   color = "danger",
  //   duration = 4000,
  //   position = "middle"
  // ) {
  //   const toast = await toastController.create({
  //     message: msg,
  //     position,
  //     duration,
  //     color,
  //     showCloseButton: true,
  //   });

  //   toast.present();
  // }

  // static async showAlert(message, alertController) {
  //   const alert = await alertController.create({
  //     message,
  //     buttons: ["OK"],
  //   });

  //   await alert.present();
  // }

  // static async loadingMask(loadingController, duration = 5000, cb = null) {
  //   const loadingMask: any = await loadingController.create({
  //     message: "Please wait...",
  //     duration,
  //   });

  //   if (typeof cb === "function") {
  //     cb(loadingMask);
  //   }

  //   loadingMask.present();
  //   return Promise.resolve(loadingMask);
  // }

  // static numberToWord(n: number) {
  //   const units = [
  //     "zero",
  //     "one",
  //     "two",
  //     "three",
  //     "four",
  //     "five",
  //     "six",
  //     "seven",
  //     "eight",
  //     "nine",
  //     "ten",
  //     "eleven",
  //     "twelve",
  //     "thirteen",
  //     "fourteen",
  //     "fifteen",
  //     "sixteen",
  //     "seventeen",
  //     "eighteen",
  //     "nineteen",
  //   ];
  //   return units[n];
  // }

  // static getSecureThumb(thumb = "") {
  //   return thumb.replace("http:", "https:"); // + '?t=' + (new Date()).getTime();
  // }

  // static convertCurrency(amount, from, to, rates, precision = 2) {
  //   if (!from || !to || !rates) {
  //     return;
  //   }

  //   const un = `${from}`.toUpperCase();
  //   const um = `${to}`.toUpperCase();
  //   const add = parseFloat(rates[un]);
  //   const ad = parseFloat(rates[um]);
  //   amount = parseFloat(amount);

  //   const propVal = amount / add;
  //   const res = (propVal * ad).toFixed(2);

  //   return res;
  // }

  // static loadScript(url, id, callback) {
  //   // Adding the script tag to the head as suggested before
  //   const doc = document as any;
  //   const elt = doc.getElementById(id);
  //   if (elt) {
  //     elt.parentNode.removeChild(doc.getElementById(id));
  //   }
  //   const head = doc.head;
  //   const script = doc.createElement("script") as any;
  //   script.type = "text/javascript";
  //   script.src = url;
  //   if (id) {
  //     script.id = id;
  //   }

  //   // Then bind the event to the callback function.
  //   // There are several events for cross browser compatibility.
  //   script.onreadystatechange = callback;
  //   script.onload = callback;

  //   // Fire the loading
  //   head.appendChild(script);
  // }

  // static getExtension(name = ""): string {
  //   return name.substr(name.lastIndexOf(".") + 1);
  // }

  // static getFileWithoutExtension(str = "") {
  //   let base = `${str}`.substring(str.lastIndexOf("/") + 1);
  //   if (base.lastIndexOf(".") !== -1) {
  //     base = base.substring(0, base.lastIndexOf("."));
  //   }

  //   return base;
  // }

  // static formatDomainData(domains, baseName = "", rates): any[] {
  //   // If domain is not sellable by the provider
  //   if (!domains) { return []; }
  //   const name = baseName.split(".").slice(0, -1).join(".");
  //   return domains.map((item) => {
  //     const amount = parseFloat(String(parseInt(item.price, 10) / 1000000));
  //     const currency = item.currency;
  //     const localCurrency = (window as any).topupDestinationCurrencyCode;
  //     const localAmount = this.convertCurrency(
  //       amount,
  //       currency,
  //       localCurrency,
  //       rates
  //     );
  //     const euroAmount = this.convertCurrency(amount, currency, "EUR", rates);
  //     const domain = {
  //       available: item.available,
  //       name: `${name}.${this.getExtension(item.domain)}`,
  //       currency,
  //       amount,
  //       localAmount,
  //       localCurrency,
  //       euroAmount,
  //       typedAmount: localAmount,
  //     };

  //     return domain;
  //   });
  // }

  // static copyTextToClipboard(text) {
  //   const nav = navigator as any;
  //   const fallbackCopyTextToClipboard = (
  //     textString,
  //     callback = (resp?) => { }
  //   ) => {
  //     const textArea = document.createElement("textarea");
  //     textArea.value = textString;

  //     // Avoid scrolling to bottom
  //     textArea.style.top = "0";
  //     textArea.style.left = "0";
  //     textArea.style.position = "fixed";

  //     document.body.appendChild(textArea);
  //     textArea.focus();
  //     textArea.select();

  //     try {
  //       const successful = document.execCommand("copy");
  //       callback(successful);
  //     } catch (err) {
  //       callback(false);
  //     }

  //     document.body.removeChild(textArea);
  //   };

  //   return new Promise((resolve, reject) => {
  //     if (!nav.clipboard) {
  //       fallbackCopyTextToClipboard(text, (resp) => {
  //         resolve(resp);
  //       });
  //       return;
  //     }

  //     nav.clipboard.writeText(text).then(
  //       () => {
  //         resolve(true);
  //       },
  //       (err) => {
  //         resolve(false);
  //       }
  //     );
  //   });
  // }

  // static countryData(CARRIER_REGEX, countryCode, dataKey) {
  //   return Object.keys(CARRIER_REGEX)
  //     .map((c_code) => {
  //       if (
  //         CARRIER_REGEX[c_code].countryIsoCode.toLowerCase() ==
  //         countryCode.toLowerCase()
  //       ) {
  //         if (dataKey) {
  //           return CARRIER_REGEX[c_code][dataKey];
  //         } else {
  //           return CARRIER_REGEX[c_code];
  //         }
  //       }
  //     })
  //     .filter((x) => x)[0];
  // }

  // static tosLocation(language = "") {
  //   return `${(window as any).tosLocation}?appUri=${(window as any).appUri
  //     }&language=${language}`;
  // }

  // static transformCurrency(
  //   currencyPipe,
  //   amount = 0,
  //   currencyCode = (window as any).topupDestinationCurrency
  // ) {
  //   const value = isNaN(amount) ? 0 : amount;
  //   return currencyPipe.transform(value, currencyCode, "symbol", "1.2-2");
  // }

  // static getCurrencyData(
  //   currencyPipe,
  //   currencyCode = (window as any).topupDestinationCurrency
  // ) {
  //   const code = currencyCode.toUpperCase();
  //   const currencySymbol = this.transformCurrency(currencyPipe, 0, code).split(
  //     "0"
  //   )[0];
  //   return { code, symbol: currencySymbol };
  // }

  // static posAdminAutoSignIn({ pvId, token, urlService, action = "", platform = null }) {
  //   urlService.navigateToRoute("Admin", { queryParams: { id: pvId } }).then();
  // }

  // static openBrowserWindow({ url, platform }) {
  //   const isMobile = platform && platform.is("cordova");
  //   if (isMobile) {
  //     return this.windowOpen(url, "_system", "location=yes");
  //   } else {
  //     (window as any).open(url, "_blank").focus();
  //   }
  // }

  // static posSaleItemDetails({ pvId, token, saleItemId = "" }) {
  //   const url = `https://jetcamer.com/yc/${pvId}/${token}/sale-item/?id=${saleItemId}`;
  //   return (window as any).open(url, "_system", "location=yes");
  // }

  // static getMyPosPermission(pos) {
  //   if (!(pos && pos.grp_id)) {
  //     return [];
  //   }

  //   const permissions = [];
  //   const grp_id = parseInt(pos.grp_id, 10);
  //   if (grp_id === 1) {
  //     permissions.push("owner");
  //   }

  //   if ([1, 2].includes(grp_id)) {
  //     permissions.push("admin");
  //   }

  //   return permissions;
  // }

  // static getSaleStatus() {
  //   return {
  //     NEW_ORDER: { code: "0", label: "New Order" },
  //     SERVED: { code: "1", label: "New Order" },
  //     AWAIT_PYMT: { code: "2", label: "New Order" },
  //     PAID: { code: "3", label: "New Order" },
  //   };
  // }

  // static getDefaultTimezone() {
  //   return "Africa/Douala";
  // }

  // static dateFormat() {
  //   return "YYYY-MM-DD HH:mm:ss";
  // }

  // static randomIntFromInterval(min, max) {
  //   // min and max included
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  // static getRandomAddress() {
  //   const streetNumber = ["25489", "87459", "35478", "15975", "95125", "78965"];
  //   const streetName = [
  //     "A street",
  //     "B street",
  //     "C street",
  //     "D street",
  //     "E street",
  //     "F street",
  //   ];
  //   const cityName = [
  //     "Riyadh",
  //     "Dammam",
  //     "Jedda",
  //     "Tabouk",
  //     "Makka",
  //     "Maddena",
  //     "Haiel",
  //   ];
  //   const stateName = [
  //     "Qassem State",
  //     "North State",
  //     "East State",
  //     "South State",
  //     "West State",
  //   ];
  //   const zipCode = ["28889", "96459", "35748", "15005", "99625", "71465"];

  //   const template = [
  //     streetNumber,
  //     " ",
  //     streetName,
  //     ", ",
  //     cityName,
  //     " ",
  //     stateName,
  //     ", ",
  //     zipCode,
  //   ];
  //   const getRandomElement = (array) => {
  //     if (array instanceof Array) {
  //       return array[Math.floor(Math.random() * array.length)];
  //     } else {
  //       return array;
  //     }
  //   };

  //   return template.map(getRandomElement).join("");
  // }

  // static divideInChunks(value, chunk = 500000) {
  //   const val = parseFloat(value);
  //   const nbrOfChunks = Math.floor(val / chunk);
  //   const remaining = val - chunk * nbrOfChunks;

  //   const chunkArray = [];
  //   for (let i = 0; i < nbrOfChunks; i++) {
  //     chunkArray.push(Array(chunk));
  //   }
  //   chunkArray.push(Array(remaining));

  //   return { chunkArray, remaining, nbrOfChunks };
  // }


  // static maskedEmail(email = "") {
  //   const str = email.split("");
  //   const finalArr = [];
  //   const len = str.indexOf("@");
  //   str.forEach((item, pos) => {
  //     pos >= 2 && pos <= len - 3 ? finalArr.push("*") : finalArr.push(str[pos]);
  //   });

  //   return finalArr.join("");
  // }

  // static md5(str) {
  //   return CryptoJS.MD5(str).toString();
  // }

  // static aes(params: { data: any; token: any }) {
  //   const { token } = params;
  //   return CryptoJS.AES.encrypt(JSON.stringify(params), token, {}).toString();
  // }

  // static aesDecode(params: { data: any; token: any }) {
  //   const { data, token } = params;
  //   const bytes = CryptoJS.AES.decrypt(data, token);

  //   let reqData: any = {};
  //   if (bytes.toString()) {
  //     reqData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   }

  //   return reqData.data;
  // }

  // static secretDbInfo() {
  //   return {
  //     DB_NAME: "secrets",
  //     UUID_TABLE_NAME: "uuid",
  //   };
  // }

  // static deviceInfo() {
  //   const device = (window as any).device || {};
  //   return {
  //     uuid: device.uuid,
  //     device: JSON.stringify(device),
  //   };
  // }

  // static languageFlag(languageKey) {
  //   return `/assets/${languageKey.toLowerCase()}.gif`;
  // }

  // static canAccessAuthModule(authFormService, requiredLogin = true) {
  //   if (!authFormService.memberID && requiredLogin) {
  //     authFormService.changeShowLoginForm(true);
  //   }

  //   return !!authFormService.memberID;
  // }

  // static itemActions() {
  //   return {
  //     add: "add",
  //     update: "update",
  //     delete: "delete",
  //     download_audio: "download_audio",
  //     download_video: "download_video",
  //     share: "share_media",
  //   };
  // }

  // static getDefaultBroadCaster(authFormService?: any) {
  //   const { memberID } = authFormService || ({} as any);
  //   const kamerDjDefaultUser = memberID || 12929;
  //   const localDjDefaultUser = kamerDjDefaultUser;
  //   const defaultBroadCaster: any = {
  //     localhost: localDjDefaultUser,
  //     "kamer-dj.com": kamerDjDefaultUser,
  //   };

  //   return defaultBroadCaster[(window as any).location.hostname] || 0;
  // }

  // static getBroacasterData(resp, broadcasterId = 0) {
  //   if (!resp) {
  //     return {};
  //   }
  //   const data = resp.filter
  //     ? resp.filter(
  //       (item) =>
  //         item &&
  //         item.isBroadcasting &&
  //         parseInt(item.id, 10) === parseInt(`${broadcasterId}`, 10)
  //     )[0]
  //     : {};
  //   if (!data) {
  //     return {};
  //   }

  //   const isBroadcasting = parseInt(data.isBroadcasting, 10) === 1;
  //   const hasWebcam = parseInt(data.hasWebcam, 10) === 1;
  //   const isFullScreenWebCam = parseInt(data.mode, 10) === 1;
  //   const chatCount = parseInt(data.chatCount, 10);
  //   const isVodMode = parseInt(data.mode, 10) === 0;

  //   return {
  //     chatCount,
  //     isBroadcasting: true,
  //     hasWebcam,
  //     isFullScreenWebCam,
  //     isVodMode,
  //   };
  // }

  // static queueUri() {
  //   return "queue";
  // }

  // static cleanYtmedia(data = {}) {
  //   const { items, selectedPlaylist } = data || ({} as any);
  //   const gItems = items.map((gItem, idx) => {
  //     const uuid = `${idx}${gItem.uri}`;
  //     const thumb =
  //       gItem.thumb || `https://i.ytimg.com/vi/${gItem.uri}/hqdefault.jpg`;
  //     return { ...gItem, ...{ thumb, selectedPlaylist, uuid } };
  //   });

  //   return Promise.resolve({ goodItems: gItems });

  //   if (items.length === 0) {
  //     return Promise.resolve({});
  //   }

  //   const playlistItems = uniqBy(items, "uri");
  //   const badItems = [];
  //   const goodItems = [];
  //   return new Promise((resolve) => {
  //     (function process() {
  //       let item = playlistItems.shift();
  //       if (!item) {
  //         return resolve({ goodItems, badItems });
  //       }

  //       item = item || {};
  //       item.thumb =
  //         item.thumb || `https://i.ytimg.com/vi/${item.uri}/hqdefault.jpg`;

  //       const img = new Image();
  //       img.onerror = (e) => {
  //         badItems.push(item.title);
  //         process();
  //       };

  //       img.onload = function () {
  //         const that = this as any;
  //         if (!(that.width === 120 && that.height === 90)) {
  //           goodItems.push(item);
  //         } else {
  //           badItems.push(item.title);
  //         }

  //         process();
  //       };

  //       img.src =
  //         item.thumb || `https://i.ytimg.com/vi/${item.uri}/hqdefault.jpg`;
  //     })();
  //   });
  // }

  // static getMediaUrl(data) {
  //   const isAudio =
  //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //       (window as any).navigator.userAgent
  //     );

  //   const id = get(data, "id", "") || get(data, "uri", "");
  //   const mobileFile = get(data, "mediaInfo.audio.url", false);
  //   const desktopFile = get(data, "mediaInfo.video.url", false);
  //   const normalizedFile = get(data, "mediaInfo.normalized.url", false);
  //   const youtubeFile =
  //     id.length === 11 ? `https://www.youtube.com/watch?v=${id}` : "";
  //   // const mediaFile = isAudio && mobileFile ? mobileFile : (normalizedFile || desktopFile || youtubeFile);

  //   // Always play video on click
  //   const mediaFile = normalizedFile || desktopFile || youtubeFile;

  //   return mediaFile;
  // }

  // static showToast(success: string) { }

  static cartSummary(cart: any, taxRate?: any, rebateRates?: any) {
    const quantityByKey: any = {};
    let quantity: any = 0;
    let totalPrice: any = 0;
    let totalTax: any = 0;
    let currency: any = "";

    Object.keys(cart).forEach((key) => {
      quantityByKey[key] = (quantityByKey[key] || 0) + parseInt(cart[key].quantity, 10);
      quantity += quantityByKey[key];
      currency = cart[key].product.currency;
      let price;

      cart[key].product.rebate = null;
      cart[key].product.rebate_id = null;
      cart[key].product.rebate_val = 0;

      if (cart[key].rebate) {
        const data = cart[key].rebate;
        const rebate = (parseFloat(cart[key].product.prixVente) * parseInt(`${100 * (parseFloat(data.rate) / 100)}`, 10)) / 100;
        const newPrice = (parseFloat(cart[key].product.prixVente) - rebate);
        price = quantityByKey[key] * newPrice;
        cart[key].product.rebate = data.name;
        cart[key].product.rebate_id = data.id;
        cart[key].product.rebate_val = rebate;
      } else {
        price = quantityByKey[key] * parseFloat(cart[key].product.prixVente);
      }

      totalPrice += price;
      totalTax += price * parseInt(`${100 * (parseFloat(taxRate) / 100)}`, 10) / 100;
    });

    return {
      quantity,
      totalPriceWithTax: (totalPrice + totalTax).toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      totalTax: totalTax.toFixed(2),
      currency,
      taxRate
    };
  }

  // static showMobileView(platform: Platform) {
  //   const isMobile = platform.is("mobile");
  //   const isCordova = platform.is("cordova");
  //   const isHybrid = platform.is("hybrid");
  //   return isCordova || isMobile || isHybrid;
  // }

  // Important: having a string for the id help with ordering product (Prepend)
  static getProductId(product: any) {
    const id = `${product.id}`.replace("prod_", "");
    return `prod_${id}`;
  }

  // static goToStore({ store = {}, searchStr = "", urlService, origin = "" }) {
  //   const { id, username: shortName } = store as any;
  //   const queryParams: any = {} as any;
  //   let pathParams;
  //   let params;
  //   let urlEnum;

  //   if (searchStr && searchStr.trim()) {
  //     queryParams.s = searchStr.trim();
  //   }

  //   if (shortName && shortName.trim()) {
  //     urlEnum = "FriendlyStore";
  //     params = { queryParams };
  //     pathParams = { shortName };
  //   } else {
  //     urlEnum = "Store";
  //     queryParams.id = id;
  //     params = { queryParams };
  //   }

  //   urlService.navigateToRoute(urlEnum, params, pathParams).then();
  // }

  // static windowOpen(url, target?, location?) {
  //   return (window as any).cordova.InAppBrowser.open(url, target, location);
  // }

  // static productMapper(product) {
  //   const { product_id: p, store_id: s, product_name: name, prix: price, category_id, details, product_thumb: thumb, currency, store_name } = product;
  //   return {
  //     id: p,
  //     storeId: s,
  //     store_name,
  //     name,
  //     category_id,
  //     price,
  //     unit: null,
  //     code: null,
  //     quantity: null,
  //     qtyMin: null,
  //     tax_rate: null,
  //     details,
  //     thumb,
  //     warehouse: null,
  //     currency,
  //     media: product.productMediaFiles && product.productMediaFiles.length > 0 ? product.productMediaFiles : [{ link: thumb, thumb }]
  //   };
  // }

  // static setProductMedia(product) {
  //   const { product_thumb: thumb } = product as any;
  //   const media = product.productMediaFiles && product.productMediaFiles.length > 0 ? product.productMediaFiles : [{ link: thumb, thumb }];
  //   product.productMediaFiles = media;
  //   product.thumb = media[0].thumb;
  //   return product;
  // }

  // static imageSizeOptimizer(file, maxSize = 500) {
  //   return new Promise((resolve, reject) => {
  //     // Ensure it's an image
  //     if (file.type.match(/image.*/)) {
  //       let originalImageData;

  //       // Load the image
  //       const reader = new FileReader();
  //       reader.onload = (readerEvent: any) => {
  //         const image = new Image();
  //         image.onload = (evt: any) => {
  //           // Resize the image
  //           const canvas = document.createElement("canvas");
  //           let width = image.width, height = image.height;
  //           if (width > height) {
  //             if (width > maxSize) {
  //               height *= maxSize / width;
  //               width = maxSize;
  //             }
  //           } else {
  //             if (height > maxSize) {
  //               width *= maxSize / height;
  //               height = maxSize;
  //             }
  //           }
  //           canvas.width = width;
  //           canvas.height = height;
  //           canvas.getContext("2d").drawImage(image, 0, 0, width, height);
  //           const dataUrl = canvas.toDataURL(file.type);
  //           const resizedImage = this.dataURLToBlob(dataUrl);
  //           resolve({
  //             blob: resizedImage,
  //             url: dataUrl,
  //             originalImageData
  //           });
  //         };
  //         image.src = readerEvent.target.result;
  //       };

  //       reader.addEventListener("load", (evt: any) => {
  //         originalImageData = evt.target.result;
  //       });

  //       reader.readAsDataURL(file);
  //     } else {
  //       reject();
  //     }
  //   });
  // }

  // static optimizeImageFromUrl({ url, type, maxSize = 1000, imgTag = null }) {
  //   const canvas = document.createElement("canvas") as HTMLCanvasElement;
  //   return new Promise((resolve, reject) => {
  //     const process = (image) => {

  //       let width = image.width, height = image.height;
  //       if (width > height) {
  //         if (width > maxSize) {
  //           height *= maxSize / width;
  //           width = maxSize;
  //         }
  //       } else {
  //         if (height > maxSize) {
  //           width *= maxSize / height;
  //           height = maxSize;
  //         }
  //       }
  //       canvas.width = width;
  //       canvas.height = height;
  //       canvas.getContext("2d").drawImage(image, 0, 0, width, height);

  //       try {
  //         const pica = Pica();
  //         pica.resize(image, canvas, {
  //           quality: 3, // max
  //           alpha: false,
  //           unsharpAmount: 150,
  //           unsharpRadius: 1,
  //           unsharpThreshold: 1,
  //         })
  //           .then((result) => pica.toBlob(result, type, 0.9))
  //           .then((blob) => {
  //             const url = canvas.toDataURL(type);
  //             resolve({ blob, url });
  //           })
  //           .catch((error) => {
  //             reject(error);
  //           });
  //       } catch (e) {
  //         reject(e);
  //       }
  //     };

  //     if (imgTag) {
  //       process(imgTag);
  //     } else {
  //       const image = new Image();
  //       image.onload = () => {
  //         process(image);
  //       };
  //       image.src = url;
  //     }
  //   });
  // }

  // /* Utility function to convert a canvas to a BLOB */
  // static dataURLToBlob(dataURL) {
  //   const BASE64_MARKER = ";base64,";
  //   if (dataURL.indexOf(BASE64_MARKER) === -1) {
  //     const dataParts = dataURL.split(",");
  //     const dataContentType = dataParts[0].split(":")[1];
  //     const dataRaw = dataParts[1];

  //     return new Blob([dataRaw], { type: dataContentType });
  //   }

  //   const parts = dataURL.split(BASE64_MARKER);
  //   const contentType = parts[0].split(":")[1];
  //   const raw = window.atob(parts[1]);
  //   const rawLength = raw.length;

  //   const uInt8Array = new Uint8Array(rawLength);

  //   for (let i = 0; i < rawLength; ++i) {
  //     uInt8Array[i] = raw.charCodeAt(i);
  //   }

  //   return new Blob([uInt8Array], { type: contentType });
  // }

  // static rawDataToUrl(data, contentType, sliceSize = 512) {
  //   const byteCharacters = atob(data);
  //   const byteArrays = [];

  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);

  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   const blob = new Blob(byteArrays, { type: contentType });
  //   return URL.createObjectURL(blob);
  // }

  // static toSeoFriendly(text) {
  //   return text.toString()               // Convert to string
  //     .normalize("NFD")               // Change diacritics
  //     .replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
  //     .replace(/\s+/g, "-")            // Change whitespace to dashes
  //     .toLowerCase()                  // Change to lowercase
  //     .replace(/&/g, "-and-")          // Replace ampersand
  //     .replace(/[^a-z0-9\-]/g, "")     // Remove anything that is not a letter, number or dash
  //     .replace(/-+/g, "-")             // Remove duplicate dashes
  //     .replace(/^-*/, "")              // Remove starting dashes
  //     .replace(/-*$/, "");             // Remove trailing dashes
  // }

  // static goToProduct({ product, urlService, appDataStoreService }) {
  //   const { product_id: p, store_id: s, product_name: name } = product;
  //   const n = this.toSeoFriendly(name);
  //   const currentProducts = appDataStoreService.currentProduct.getValue() || {};
  //   currentProducts[`${p}${s}`] = product;
  //   appDataStoreService.changeCurrentProduct(currentProducts);
  //   urlService.navigateToRoute("ProductDetails", null, { p, s, n }).then();
  // }

  // static isValidDomainName(domain) {
  //   return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/gi.test(domain);
  // }

  // static getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // static getMonthLabel(monthNumber) {
  //   const monthLabels = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  //   return monthLabels[parseInt(monthNumber, 10) - 1];
  // }

  // static getDayLabel(dayNumber) {
  //   const dayLabels = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday" };
  //   return dayLabels[parseInt(dayNumber, 10)];
  // }

  // static getRandomColor() {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  // static getFilteredItems(str, initItems = [], key = 'title') {
  //   return initItems.filter((item) => {
  //     if (!(item && item[key])) { return false; }
  //     if (!str) { return true; }
  //     const name = item[key]
  //       .trim()
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "");
  //     const search = str
  //       .trim()
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "")
  //       .replace(/[^\x00-\x7F]/g, "");
  //     return new RegExp(search, "gi").test(name);
  //   });
  // }

  // static getFilteredArray(str: any, strings: string[]) {
  //   return strings.filter((item) => {
  //     if (!item || !str) { return false; }
  //     const name = item
  //       .trim()
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "");
  //     const search = str
  //       .trim()
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "")
  //       .replace(/[^\x00-\x7F]/g, "");
  //     return new RegExp(search, "gi").test(name);
  //   });
  // }

  // static isSunday(date = new Date()) {
  //   return date.getDay() === 0;
  // }

  // static isWeekDay(date: Date) {
  //   return !this.isSunday(date);
  // }

  // static processCanalSaleDataImport({ rows, fileName, headers = null }) {
  //   const that = this;

  //   const canalData = rows.slice(0);
  //   let headerIndex;

  //   const setHeaderIndexes = (arr) => {
  //     headers = arr;
  //     headerIndex = {};
  //     headers.forEach((key, idx) => {
  //       headerIndex[key] = idx;
  //     });
  //   };

  //   const isHeader = (arr) => {
  //     return arr.includes("CARTICLE") && arr.includes("LARTICLE");
  //   };

  //   const allData = [];

  //   (function process() {
  //     const item = canalData.shift();

  //     if (!item) {
  //       return;
  //     }

  //     if (!headers && isHeader(item)) {
  //       setHeaderIndexes(item);
  //       return process();
  //     } else if (headers && !headerIndex) {
  //       setHeaderIndexes(headers);
  //     }

  //     if (isHeader(item) || !headers) {
  //       return process();
  //     }

  //     const row: any = {};

  //     item.forEach((data, idx) => {

  //       if (`${headers[idx]}`.toLowerCase() === `NUMABONT`.toLowerCase()) {
  //         data = parseInt(data, 10);
  //       }

  //       if (`${headers[idx]}`.toLowerCase() === `MONTANT_TTC`.toLowerCase() || `${headers[idx]}`.toLowerCase() === `MONTANT_HT`.toLowerCase()) {
  //         data = parseFloat(data);
  //       }


  //       if (["date", "DEBABO".toLowerCase(), "FINABO".toLowerCase(), "VALIDFULL".toLowerCase()].includes(`${headers[idx]}`.toLowerCase())) {
  //         if (/\-/.test(data)) {
  //           row[headers[idx]] = data;
  //         } else {
  //           row[headers[idx]] = moment(data, that.dayMonthYearFormat).format("YYYY-MM-DD");
  //         }
  //       } else {
  //         row[headers[idx]] = data;
  //       }

  //     });

  //     if (row.CARTICLE && `${row.LARTICLE}`.trim()) {
  //       row.hash = that.md5(fileName);
  //       allData.push(row);
  //     }

  //     process();
  //   }());

  //   const products = (uniqBy(allData.map(this.canalProductImportMapper.bind(this)), "name") || []).filter(x => !!x.price);
  //   const saleItems = allData.map(this.saleItemImportMapper.bind(this));

  //   return {
  //     products,
  //     saleItems,
  //     headers
  //   };
  // }

  // static canalProductImportMapper(item) {
  //   const { CARTICLE, LARTICLE, MONTANT_HT, DEVISE, hash } = item;
  //   return {
  //     name: CARTICLE.trim(),
  //     description: LARTICLE.trim(),
  //     price: Math.abs(MONTANT_HT),
  //     currency: DEVISE.trim(),
  //     hash
  //   };
  // }

  // static saleItemImportMapper(item: any, index) {
  //   const { NUMABONT: quantity, DATE: added_time, MONTANT_TTC: total_price, MONTANT_HT: ht_price, CARTICLE: product_name, NUMDIST: seller_code, NOMDIST: seller_name, CMOUVMT: type, DEBABO: subs_start, FINABO: subs_end, hash } = item;
  //   const total_tax = parseFloat(total_price) - parseFloat(ht_price);
  //   return {
  //     index: (index + 1),
  //     quantity,
  //     status: 2,
  //     added_time,
  //     product_name,
  //     seller_code,
  //     seller_name,
  //     type,
  //     total_price,
  //     total_tax,
  //     subs_start,
  //     subs_end,
  //     hash
  //   };
  // }

  // static handleMutation({ data, items }) {
  //   const { product, action } = data;
  //   if (product) {
  //     const index = findIndex(items, { product_id: product.product_id });
  //     if (index !== -1) {
  //       if (action === "delete") {
  //         // Remove item at index using native splice
  //         items.splice(index, 1);
  //       } else {
  //         // Replace item at index using native splice
  //         items.splice(index, 1, product);
  //         items[index] = product;
  //       }
  //     } else {
  //       items = [...[product], ...items];
  //     }

  //     /*
  //     this.pageNumber = 1;
  //     this.appDataStoreService.searchStr$.next({
  //         search: this.search,
  //         mineOnly: this.mineOnly,
  //         filter: this.filter,
  //         store: this.selectedStore
  //     });
  //     */
  //   }
  // }

  // static generateObjectId({ storeId, memberId }) {
  //   const str = `${memberId}${storeId}`;
  //   const len = 16 - str.length;
  //   const randStr = this.getRandomString(len);
  //   // tslint:disable-next-line:no-bitwise
  //   const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  //   return timestamp + randStr.replace(/[x]/g, () => {
  //     // tslint:disable-next-line:no-bitwise
  //     return (Math.random() * 16 | 0).toString(16);
  //   }).toLowerCase();
  // }

  // static getRandomString(length) {
  //   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let randS = "";

  //   while (length > 0) {
  //     randS += chars.charAt(Math.floor(Math.random() * chars.length));
  //     length--;
  //   }
  //   return randS;
  // }
  static getFilteredItems(str: any, initItems: any = [], key = 'title') {
    return initItems.filter((item: any) => {
      if (!(item && item[key])) { return false; }
      if (!str) { return true; }
      const name = item[key]
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const search = str
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x00-\x7F]/g, "");
      return new RegExp(search, "gi").test(name);
    });
  }
}
