import * as app from "tns-core-modules/application";

declare var com: any;

export interface Order {
    MID: string;
    ORDER_ID: string;
    CUST_ID: string;
    INDUSTRY_TYPE_ID: string;
    CHANNEL_ID: string;
    TXN_AMOUNT: string;
    WEBSITE: string;
    CALLBACK_URL: string;
    EMAIL?: string;
    MOBILE_NO?: string;
    CHECKSUMHASH: string;
}

export interface TransactionCallback {
    someUIErrorOccurred: Function;
    onTransactionResponse: Function;
    networkNotAvailable: Function;
    clientAuthenticationFailed: Function;
    onErrorLoadingWebPage: Function;
    onBackPressedCancelTransaction: Function;
    onTransactionCancel: Function;
}

export class Paytm {
    private Service: com.paytm.pgsdk.PaytmPGService = null;
    private Certificate: com.paytm.pgsdk.PaytmClientCertificate = null;
    private paymentOrder: com.paytm.pgsdk.PaytmOrder;

    private setServiceType(type: string) {
        if (type === "PRODUCTION") {
            this.Service = com.paytm.pgsdk.PaytmPGService.getProductionService();
        } else if (type === "STAGING") {
            this.Service = com.paytm.pgsdk.PaytmPGService.getStagingService();
        } else {
            throw new Error(
                "Paytm service type is invalid: It must be either PRODUCTION or STAGING"
            );
        }
    }

    createOrder(order: Order) {
        if (
            !order.MID ||
            !order.ORDER_ID ||
            !order.CUST_ID ||
            !order.INDUSTRY_TYPE_ID ||
            !order.CHANNEL_ID ||
            !order.TXN_AMOUNT ||
            !order.WEBSITE ||
            !order.CALLBACK_URL ||
            !order.CHECKSUMHASH
        ) {
            throw new Error(
                "Please check if order object is having all required keys"
            );
        }

        const paramMap = new java.util.HashMap<String, String>();
        paramMap.put("MID", order.MID);
        paramMap.put("ORDER_ID", order.ORDER_ID);
        paramMap.put("CUST_ID", order.CUST_ID);
        paramMap.put("INDUSTRY_TYPE_ID", order.INDUSTRY_TYPE_ID);
        paramMap.put("CHANNEL_ID", order.CHANNEL_ID);
        paramMap.put("TXN_AMOUNT", order.TXN_AMOUNT);
        paramMap.put("WEBSITE", order.WEBSITE);
        paramMap.put("CALLBACK_URL", order.CALLBACK_URL);
        if (order.EMAIL) {
            paramMap.put("EMAIL", order.EMAIL);
        }
        if (order.MOBILE_NO) {
            paramMap.put("MOBILE_NO", order.MOBILE_NO);
        }
        paramMap.put("CHECKSUMHASH", order.CHECKSUMHASH);
        this.paymentOrder = new com.paytm.pgsdk.PaytmOrder(paramMap);
    }

    setCertificate(password: string, filename: string) {
        this.Certificate = new com.paytm.pgsdk.PaytmClientCertificate(
            password,
            filename
        );
    }

    initialize(type: string) {
        this.setServiceType(type);
        if (!this.Service) {
            throw new Error("Please initialize the Service first");
        }
        this.Service.initialize(this.paymentOrder, this.Certificate);
    }

    startPaymentTransaction(transactionCallbacks: TransactionCallback) {
        this.Service.startPaymentTransaction(
            app.android.foregroundActivity,
            true,
            true,
            new com.paytm.pgsdk.PaytmPaymentTransactionCallback({
                someUIErrorOccurred: function(inErrorMessage: string) {
                    transactionCallbacks.someUIErrorOccurred(inErrorMessage);
                },
                onTransactionResponse: function(inResponse: android.os.Bundle) {
                    transactionCallbacks.onTransactionResponse(
                        inResponse.toString()
                    );
                },
                networkNotAvailable: function() {
                    transactionCallbacks.networkNotAvailable();
                },
                clientAuthenticationFailed: function(inErrorMessage: string) {
                    transactionCallbacks.clientAuthenticationFailed(
                        inErrorMessage
                    );
                },
                onErrorLoadingWebPage: function(
                    iniErrorCode: number,
                    inErrorMessage: string,
                    inFailingUrl: string
                ) {
                    transactionCallbacks.onErrorLoadingWebPage(
                        iniErrorCode,
                        inErrorMessage,
                        inFailingUrl
                    );
                },
                onBackPressedCancelTransaction: function() {
                    transactionCallbacks.onBackPressedCancelTransaction();
                },
                onTransactionCancel: function(
                    inErrorMessage: string,
                    inResponse: android.os.Bundle
                ) {
                    transactionCallbacks.onTransactionCancel(
                        inErrorMessage,
                        inResponse.toString()
                    );
                }
            })
        );
    }
}
