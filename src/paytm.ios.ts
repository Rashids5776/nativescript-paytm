import * as app from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";
import { topmost } from "tns-core-modules/ui/frame";

declare const eServerTypeProduction, eServerTypeStaging;

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

export interface IOSCallback {
    // Don't blame me for the spelling mistakes
    didFinishedResponse: Function;
    didCancelTransaction: Function;
    errorMissingParameterError: Function;
}

let transactionCallbacks;

class PGTransactionDelegateImpl extends NSObject
    implements PGTransactionDelegate {
    public static ObjCProtocols = [PGTransactionDelegate];

    private _owner;
    public static initWithOwner(owner): PGTransactionDelegateImpl {
        const delegate = <PGTransactionDelegateImpl>PGTransactionDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    }

    didFinishedResponseResponse(controller, response) {
        transactionCallbacks.didFinishedResponse(response);
        (topmost().ios
            .controller as UINavigationController).popViewControllerAnimated(
            true
        );
    }

    didCancelTrasaction(controller) {
        transactionCallbacks.didCancelTransaction();
        (topmost().ios
            .controller as UINavigationController).popViewControllerAnimated(
            true
        );
    }

    errorMisssingParameterError(controller, error) {
        transactionCallbacks.errorMissingParameterError(error);
        (topmost().ios
            .controller as UINavigationController).popViewControllerAnimated(
            true
        );
    }
}

export class Paytm {
    txnController;
    paymentOrder;
    mc;

    setIOSCallbacks(callbacks: IOSCallback) {
        transactionCallbacks = callbacks;
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

        const orderDict = {};
        orderDict["MID"] = order.MID;
        orderDict["ORDER_ID"] = order.ORDER_ID;
        orderDict["CUST_ID"] = order.CUST_ID;
        orderDict["INDUSTRY_TYPE_ID"] = order.INDUSTRY_TYPE_ID;
        orderDict["CHANNEL_ID"] = order.CHANNEL_ID;
        orderDict["TXN_AMOUNT"] = order.TXN_AMOUNT;
        orderDict["WEBSITE"] = order.WEBSITE;
        orderDict["CALLBACK_URL"] = order.CALLBACK_URL;
        orderDict["CHECKSUMHASH"] = order.CHECKSUMHASH;

        if (order.EMAIL) {
            orderDict["EMAIL"] = order.EMAIL;
        }
        if (order.MOBILE_NO) {
            orderDict["MOBILE_NO"] = order.MOBILE_NO;
        }
        this.mc = PGMerchantConfiguration.defaultConfiguration;
        this.paymentOrder = PGOrder.orderWithParams(<any>orderDict);
    }

    initialize(type: string) {
        this.txnController = PGTransactionViewController.alloc().initTransactionForOrder(
            this.paymentOrder
        );

        if (type === "PRODUCTION") {
            this.txnController.serverType = eServerTypeProduction;
        } else if (type === "STAGING") {
            this.txnController.serverType = eServerTypeStaging;
        } else {
            throw new Error(
                "Paytm service type is invalid: It must be either PRODUCTION or STAGING"
            );
        }

        this.txnController.merchant = this.mc;

        this.txnController.delegate = PGTransactionDelegateImpl.initWithOwner(
            new WeakRef(this)
        );
    }

    startPaymentTransaction(transactionCallbacks: TransactionCallback) {
        (topmost().ios
            .controller as UINavigationController).pushViewControllerAnimated(
            this.txnController,
            true
        );
    }
}
