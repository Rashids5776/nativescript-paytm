var Paytm = require("nativescript-paytm").Paytm;
var paytm = new Paytm();

describe("greet function", function() {
    it("exists", function() {
        expect(paytm.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(paytm.greet()).toEqual("Hello, NS");
    });
});