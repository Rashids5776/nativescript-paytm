/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />
/// <reference path="typings/android.d.ts" />

interface PGTransactionDelegate extends NSObjectProtocol {
    didFinishedResponse?(controller, response): void;

    didCancelTransaction?(controller, error, response): void;

    didFinishCASTransaction?(controller, response): void;
}
