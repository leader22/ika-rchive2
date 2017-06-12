// @flow
import { extendObservable } from 'mobx';


class WelcomeStore {
  _ver: string;
  rate: number;

  constructor(ver: string) {
    this._ver = ver;

    extendObservable(this, {
      rate: 0
    });
  }

  setRate(rate: number) {
    this.rate = rate;
  }
}

export default WelcomeStore;
