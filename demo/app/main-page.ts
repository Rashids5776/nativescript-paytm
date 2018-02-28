import * as observable from "tns-core-modules/data/observable";
import * as pages from "tns-core-modules/ui/page";
import {
    Paytm,
    Order,
    TransactionCallback,
    IOSCallback
} from "@nstudio/nativescript-paytm";

const paytm = new Paytm();

export function pageLoaded(args: observable.EventData) {
    let page = <pages.Page>args.object;
}

export function onPayWithPaytm(args: observable.EventData) {
    console.log("Paying");

    paytm.setIOSCallbacks({
        didFinishedResponse: function(response) {
            console.log("got response");
            console.log(response);
        },
        didCancelTransaction: function() {
            console.log("User cancelled transaction");
        },
        errorMissingParameterError: function(error) {
            console.log(error);
        }
    });

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

    paytm.initialize("STAGING");

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
