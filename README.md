# nativescript-paytm

Works on Android and iOS.
For use in India to pay via Paytm.

## Installation

```javascript
tns plugin add @nstudio/nativescript-paytm
```

## Usage

You will need a working [backend server](https://github.com/Paytm-Payments/Paytm_App_Checksum_Kit_NodeJs) to generate paytm orders.
Do not generate the order or checksum in the app.

### Typescript / Angular

```js
import {
    Paytm,
    Order,
    TransactionCallback,
    IOSCallback
} from "@nstudio/nativescript-paytm";

export function onPayWithPaytm(args: observable.EventData) {
    paytm.setIOSCallbacks({
        didFinishedResponse: function(response) {
            console.log(response);
        },
        didCancelTransaction: function() {
            console.log("User cancelled transaction");
        },
        errorMissingParameterError: function(error) {
            console.log(error);
        }
    });

    // Sample order
    const order: Order = {
        // This will fail saying duplicate order id
        // generate your own order to test this.
        MID: "Tomcas09769922377481",
        ORDER_ID: "ORDER8874",
        CUST_ID: "CUST6483",
        INDUSTRY_TYPE_ID: "Retail",
        CHANNEL_ID: "WAP",
        TXN_AMOUNT: "10.00",
        WEBSITE: "APP_STAGING",
        CALLBACK_URL: "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp",
        CHECKSUMHASH:
            "NDspZhvSHbq44K3A9Y4daf9En3l2Ndu9fmOdLG+bIwugQ6682Q3JiNprqmhiWAgGUnNcxta3LT2Vtk3EPwDww8o87A8tyn7/jAS2UAS9m+c="
    };

    paytm.createOrder(order);

    paytm.initialize("STAGING"); // set to PRODUCTION when you go live

    paytm.startPaymentTransaction({
        someUIErrorOccurred: function(inErrorMessage) {
            console.log(inErrorMessage);
        },
        onTransactionResponse: function(inResponse) {
            console.log(inResponse);
        },
        networkNotAvailable: function() {
            console.log("Network not available");
        },
        clientAuthenticationFailed: function(inErrorMessage) {
            console.log(inErrorMessage);
        },
        onErrorLoadingWebPage: function(
            iniErrorCode,
            inErrorMessage,
            inFailingUrl
        ) {
            console.log(iniErrorCode, inErrorMessage, inFailingUrl);
        },
        onBackPressedCancelTransaction: function() {
            console.log("User cancelled transaction by pressing back button");
        },
        onTransactionCancel: function(inErrorMessage, inResponse) {
            console.log(inErrorMessage, inResponse);
        }
    });
}
```

## JavaScript
Same as above, but the import statement will be

```js
const Paytm = require("@nstudio/nativescript-paytm").Paytm
```

**NOTE:**
If you are using Sandbox credentials, then you won't be able to see the option
to pay with Credit/Debit card or netbanking. That is perfectly normal.
Once you get staging and production credentials from paytm, you will be able to
use it just fine.

## API

**setIOSCallbacks (object with callback methods for iOS) : void** -
Used to set the iOS Callbacks
Available callbacks are

    didFinishedResponse (response) : void
    didCancelTransaction () : void
    errorMissingParameterError (response): void

**createOrder (order object) : void** -
Used to create an order using paytm order object.
Please refer the usage guide for sample order.

**initialize (string) : void** -
Used to initialise paytm environment.
Accepted strings are "STAGING" and "PRODUCTION"

**startPaymentTransaction (object with callback methods for Android) : void** -
Used to start a transaction.
Available callbacks are

    someUIErrorOccurred (inErrorMessage) : void
    onTransactionResponse (inResponse) : void // transaction successful
    networkNotAvailable () : void
    clientAuthenticationFailed (inErrorMessage) : void
    onErrorLoadingWebPage (iniErrorCode, inErrorMessage, inFailingUrl) : void
    onBackPressedCancelTransaction ()
    onTransactionCancel (inErrorMessage, inResponse) : void

The callback method names are self explanatory.

## License

Apache License Version 2.0, January 2004
