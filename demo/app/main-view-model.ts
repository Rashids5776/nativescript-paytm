import { Observable } from 'tns-core-modules/data/observable';
import { Paytm } from 'nativescript-paytm';

export class HelloWorldModel extends Observable {
  public message: string;
  private paytm: Paytm;

  constructor() {
    super();

    this.paytm = new Paytm();
    this.message = this.paytm.message;
  }
}
