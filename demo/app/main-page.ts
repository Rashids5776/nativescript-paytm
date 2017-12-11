import * as observable from "tns-core-modules/data/observable";
import * as pages from "tns-core-modules/ui/page";
import { Paytm, Order, TransactionCallback } from "nativescript-paytm";

const paytm = new Paytm();

export function pageLoaded(args: observable.EventData) {
    let page = <pages.Page>args.object;
}

export function onPayWithPaytm(args: observable.EventData) {
    console.log("Paying");
    const order: Order = {
        MID: "BfitTe21593236801620",
        ORDER_ID: "TestOrder1",
        CUST_ID: "mailshiva19@gmail.com",
        INDUSTRY_TYPE_ID: "Retail",
        CHANNEL_ID: "WAP",
        TXN_AMOUNT: "1",
        WEBSITE:
            "https://play.google.com/store/apps/details?id=com.anygofitness.anygouser",
        CALLBACK_URL: "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp",
        CHECKSUMHASH:
            "w2QDRMgp1/BNdEnJEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4="
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
