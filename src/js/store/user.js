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


class UserStore {
  ver: string;

  constructor(key: string) {
    extendObservable(this, {
      ver: '',
    });

    this._syncStorage(key);
  }

  _syncStorage(key: string): void {
    const stored = storage.getItem(key);
    if (typeof stored === 'string') {
      extendObservable(this, JSON.parse(stored));
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

export default UserStore;
