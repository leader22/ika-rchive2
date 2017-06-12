// @flow
import { bindThis } from '../shared/util';

import type WelcomeStore from './store';


class WelcomeEvent {
  store: WelcomeStore;

  constructor(store: WelcomeStore) {
    bindThis(this);

    this.store = store;
  }

  onChangeRate(rate: number): void {
    this.store.setRate(rate);
  }

  onClickStart(): void {
    console.log('start! w/', this.store);
    // store.rateでもって、1件目のデータを作る
    // そしてリロードすれば次回はArchiveAppが動く
    // なのであっちと同じ形式でデータを作る必要がある
    // new Record(store);
  }
}

export default WelcomeEvent;
