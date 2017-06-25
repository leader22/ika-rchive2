// @flow
import {
  extendObservable,
  reaction,
  toJS,
} from 'mobx';

import { getGlobal } from '../util';

// eslint-disable-next-line
const isDev = __DEV__;
const window = getGlobal();


class UserStore {
  ver: string;
  visibleTab: number;

  constructor(key: string) {
    extendObservable(this, {
      ver: '',
      visibleTab: 0,
    });

    this._syncStorage(key);
  }

  _syncStorage(key: string): void {
    const stored = window.localStorage.getItem(key);
    if (typeof stored === 'string') {
      extendObservable(this, JSON.parse(stored));
    }

    reaction(
      () => toJS(this),
      data => {
        window.localStorage.setItem(key, JSON.stringify(data));
        if (isDev) { console.log(data); }
      }
    );
  }

  setVisibleTab(idx: number): void {
    this.visibleTab = idx;
  }
}

export default UserStore;
