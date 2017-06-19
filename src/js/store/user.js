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
  visibleTab: number;

  constructor(key: string) {
    extendObservable(this, {
      ver: '',
      // 最初はソノタのタブ
      visibleTab: 3,
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

  setVisibleTab(idx: number) {
    this.visibleTab = idx;
  }
}

export default UserStore;
