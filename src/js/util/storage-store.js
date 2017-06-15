// @flow
import {
  extendObservable,
  reaction,
  toJS,
} from 'mobx';
// TODO: mock
const storage = localStorage;
// eslint-disable-next-line
const isDev = __DEV__;


class StorageStore {
  constructor(key: string, data: Object) {
    const stored = storage.getItem(key);
    if (typeof stored === 'string') {
      extendObservable(this, JSON.parse(stored));
    }
    else {
      extendObservable(this, data);
    }

    reaction(
      () => toJS(this),
      data => {
        storage.setItem(key, JSON.stringify(data));
        if (isDev) { console.log(data); }
      }
    );
  }
}

export default StorageStore;
