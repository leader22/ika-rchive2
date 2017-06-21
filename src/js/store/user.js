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
  lastRankAndPoint: LastRankAndPoint;

  constructor(key: string) {
    extendObservable(this, {
      ver: '',
      // 最初はソノタのタブ
      visibleTab: 3,
      // 直近でキロクしたもの
      lastRankAndPoint: {
        '0': [0, 0],
        '1': [0, 0],
        '2': [0, 0],
      }
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

  updateLastRankAndPoint(log: LogSeed): void {
    const { md, rk, pt } = log;
    this.lastRankAndPoint[String(md)].splice(0, 2, rk, pt);
  }
}

export default UserStore;
