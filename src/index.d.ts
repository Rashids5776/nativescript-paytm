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
    didFinishedResponse: Function;
    didCancelTransaction: Function;
    errorMissingParameterError: Function;
}
export declare class Paytm {
    private Service;
    private Certificate;
    private paymentOrder;
    setIOSCallbacks(callbacks: IOSCallback): void;
    createOrder(order: Order): void;
    setCertificate(password: string, filename: string): void;
    initialize(type: string): void;
    startPaymentTransaction(transactionCallbacks: TransactionCallback): void;
}
