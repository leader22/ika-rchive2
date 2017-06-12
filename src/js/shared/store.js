// @flow
import { computed, extendObservable } from 'mobx';

import type { IObservableArray } from 'mobx';


class SharedStore {
  items: IObservableArray<*>;

  constructor(global: window) {
    const data = global.localStorage.getItem('IA2');

    if (data !== null) {
      console.log('no data');
    }

    extendObservable(this, {
      items: [],
      hasRecord: computed(() => {
        return this.items.length !== 0;
      }),
    });
  }

  addRecord(rate: number): void {
    console.log('add', rate);
  }
}

export default SharedStore;
