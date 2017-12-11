import * as app from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";
import { topmost } from "tns-core-modules/ui/frame";

declare var PGTransactionViewController,
    PGOrder,
    NSMutableDictionary,
    PGServerEnvironment,
    ServerType,
    PGMerchantConfiguration,
    ViewController,
    PaymentsSDK;

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

let transactionCallbacks;

class PGTransactionDelegateImpl extends NSObject
    implements PGTransactionDelegate {
    public static ObjCProtocols = [PGTransactionDelegateImpl];

    private _owner;
    public static initWithOwner(owner): PGTransactionDelegateImpl {
        const delegate = <PGTransactionDelegateImpl>PGTransactionDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    }

    didFinishedResponse(controller, response) {
        console.log("in did finish response");
        transactionCallbacks.onTransactionResponse(response);
    }

    didCancelTransaction(controller, error, response) {
        transactionCallbacks.onTransactionCancel(error, response);
    }

    didFinishCASTransaction(controller, response) {
        console.log(response);
    }
}

export class Paytm {
    paymentOrder;
    txnController;

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
        orderDict["CHANNEL_ID"] = order.CHANNEL_ID;
        orderDict["INDUSTRY_TYPE_ID"] = order.INDUSTRY_TYPE_ID;
        orderDict["WEBSITE"] = order.WEBSITE;
        orderDict["TXN_AMOUNT"] = order.TXN_AMOUNT;
        orderDict["ORDER_ID"] = order.ORDER_ID;
        orderDict["CALLBACK_URL"] = order.CALLBACK_URL;
        orderDict["CHECKSUMHASH"] = order.CHECKSUMHASH;
        orderDict["REQUEST_TYPE"] = "DEFAULT";
        orderDict["CUST_ID"] = order.CUST_ID;

        if (order.EMAIL) {
            orderDict["EMAIL"] = order.EMAIL;
        }
        if (order.MOBILE_NO) {
            orderDict["MOBILE_NO"] = order.MOBILE_NO;
        }
        this.paymentOrder = PGOrder.orderWithParams(<any>orderDict);
    }

    initialize(type: string) {
        PGServerEnvironment.selectServerDialogCompletionHandler(
            topmost().ios.controller.view,
            () => {
                this.txnController = PGTransactionViewController.alloc().initTransactionForOrder(
                    this.paymentOrder
                );

                if (type === "PRODUCTION" || type === "STAGING") {
                    this.txnController.serverType = type;
                } else {
                    throw new Error(
                        "Paytm service type is invalid: It must be either PRODUCTION or STAGING"
                    );
                }
                this.txnController.serverType = type;
                this.txnController.merchant = utils.ios.getter(
                    PGMerchantConfiguration,
                    PGMerchantConfiguration.defaultConfiguration
                );
                this.txnController.delegate = PGTransactionDelegateImpl.initWithOwner(
                    new WeakRef(this)
                );
            }
        );
    }

    startPaymentTransaction(transactionCallbacks: TransactionCallback) {
        transactionCallbacks = transactionCallbacks;
        (topmost().ios
            .controller as UINavigationController).presentViewControllerAnimatedCompletion(
            this.txnController,
            true,
            () => {}
        );
    }
}

console.log(PaymentsSDK);
