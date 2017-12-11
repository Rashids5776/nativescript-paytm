
declare const enum NetworkStatus {

	NotReachable = 0,

	ReachableViaWiFi = 2,

	ReachableViaWWAN = 1
}

declare class PGMerchantConfiguration extends NSObject {

	static alloc(): PGMerchantConfiguration; // inherited from NSObject

	static defaultConfiguration(): PGMerchantConfiguration;

	static new(): PGMerchantConfiguration; // inherited from NSObject

	authMode: string;

	bankCode: string;

	cardType: string;

	channelID: string;

	checksumGenerationURL: string;

	checksumValidationURL: string;

	clientSSLCertPassword: string;

	clientSSLCertPath: string;

	industryID: string;

	merchantID: string;

	paymentTypeID: string;

	theme: string;

	website: string;

	transactionParametersForOrder(order: PGOrder): NSDictionary<any, any>;
}

declare const enum PGMerchantVerificationStatus {

	kCASVerificationStatusUndefined = 0,

	kCASVerificationStatusSuccess = 1,

	kCASVerificationStatusFailed = 2
}

declare class PGOrder extends NSObject {

	static alloc(): PGOrder; // inherited from NSObject

	static new(): PGOrder; // inherited from NSObject

	static orderForOrderIDCustomerIDAmountCustomerMailCustomerMobile(orderID: string, customerID: string, amount: string, eMail: string, mobile: string): PGOrder;

	static orderWithParams(dictionary: NSDictionary<any, any>): PGOrder;

	amount: string;

	customerID: string;

	eMail: string;

	mobile: string;

	orderID: string;

	params: NSDictionary<any, any>;
}

declare class PGServerEnvironment extends NSObject {

	static alloc(): PGServerEnvironment; // inherited from NSObject

	static createProductionEnvironment(): PGServerEnvironment;

	static createStagingEnvironment(): PGServerEnvironment;

	static currentServerEnvironment(): PGServerEnvironment;

	static new(): PGServerEnvironment; // inherited from NSObject

	static selectServerDialogCompletionHandler(parentView: UIView, handler: (p1: ServerType) => void): void;

	static serverEnvironmentCreated(): boolean;

	static statusForOrderIDResponseHandler(orderID: string, handler: (p1: NSDictionary<any, any>, p2: NSError) => void): void;

	callBackURLFormat: string;

	readonly cancelTransactionURL: string;

	readonly checksumValidationURL: string;

	readonly clientAuthURL: string;

	readonly isProduction: boolean;

	readonly paymentGatewayURL: string;

	readonly refundURL: string;

	readonly statusQueryURL: string;

	domain(): string;
}

interface PGTransactionDelegate extends NSObjectProtocol {

	didCancelTrasaction(controller: PGTransactionViewController): void;

	didFinishedResponseResponse(controller: PGTransactionViewController, responseString: string): void;

	errorMisssingParameterError(controller: PGTransactionViewController, error: NSError): void;
}
declare var PGTransactionDelegate: {

	prototype: PGTransactionDelegate;
};

declare class PGTransactionViewController extends UIViewController implements UIActionSheetDelegate, UIWebViewDelegate {

	static alloc(): PGTransactionViewController; // inherited from NSObject

	static new(): PGTransactionViewController; // inherited from NSObject

	cancelButton: UIButton;

	delegate: PGTransactionDelegate;

	loggingEnabled: boolean;

	merchant: PGMerchantConfiguration;

	sendAllChecksumResponseParamsToPG: boolean;

	serverType: ServerType;

	topBar: UIView;

	useStaging: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { transactionForOrder: PGOrder; });

	actionSheetCancel(actionSheet: UIActionSheet): void;

	actionSheetClickedButtonAtIndex(actionSheet: UIActionSheet, buttonIndex: number): void;

	actionSheetDidDismissWithButtonIndex(actionSheet: UIActionSheet, buttonIndex: number): void;

	actionSheetWillDismissWithButtonIndex(actionSheet: UIActionSheet, buttonIndex: number): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	didPresentActionSheet(actionSheet: UIActionSheet): void;

	initTransactionForOrder(order: PGOrder): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	webViewDidFailLoadWithError(webView: UIWebView, error: NSError): void;

	webViewDidFinishLoad(webView: UIWebView): void;

	webViewDidStartLoad(webView: UIWebView): void;

	webViewShouldStartLoadWithRequestNavigationType(webView: UIWebView, request: NSURLRequest, navigationType: UIWebViewNavigationType): boolean;

	willPresentActionSheet(actionSheet: UIActionSheet): void;
}

declare class Reachability extends NSObject {

	static alloc(): Reachability; // inherited from NSObject

	static new(): Reachability; // inherited from NSObject

	static reachabilityForInternetConnection(): Reachability;

	static reachabilityForLocalWiFi(): Reachability;

	static reachabilityWithAddress(hostAddress: interop.Pointer | interop.Reference<sockaddr_in>): Reachability;

	static reachabilityWithHostname(hostname: string): Reachability;

	reachableBlock: (p1: Reachability) => void;

	reachableOnWWAN: boolean;

	unreachableBlock: (p1: Reachability) => void;

	constructor(o: { reachabilityRef: any; });

	connectionRequired(): boolean;

	currentReachabilityFlags(): string;

	currentReachabilityStatus(): NetworkStatus;

	currentReachabilityString(): string;

	initWithReachabilityRef(ref: any): this;

	isConnectionOnDemand(): boolean;

	isConnectionRequired(): boolean;

	isInterventionRequired(): boolean;

	isReachable(): boolean;

	isReachableViaWWAN(): boolean;

	isReachableViaWiFi(): boolean;

	reachabilityFlags(): SCNetworkReachabilityFlags;

	startNotifier(): boolean;

	stopNotifier(): void;
}

declare const enum ServerType {

	eServerTypeProduction = 0,

	eServerTypeStaging = 1,

	eServerTypeNone = 2
}

declare var kReachabilityChangedNotification: string;
