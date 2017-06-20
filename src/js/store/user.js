// @flow
import {
  extendObservable,
  reaction,
  toJS,
} from 'mobx';

// eslint-disable-next-line
const isDev = __DEV__;


class UserStore {
  ver: string;
  visibleTab: number;
  lastRankAndPoint: LastRankAndPoint;

  _storage: Storage;

  constructor(key: string, storage: Storage) {
    this._storage = storage;

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
    const stored = this._storage.getItem(key);
    if (typeof stored === 'string') {
      extendObservable(this, JSON.parse(stored));
    }

    reaction(
      () => toJS(this),
      data => {
        this._storage.setItem(key, JSON.stringify(data));
        if (isDev) { console.log(data); }
      }
    );
  }

  setVisibleTab(idx: number): void {
    this.visibleTab = idx;
  }

  updateLastRankAndPoint(log: LogSeed): void {
    const { mode, rank, point } = log;
    this.lastRankAndPoint[String(mode)].splice(0, 2, rank, point);
  }
}

export default UserStore;
