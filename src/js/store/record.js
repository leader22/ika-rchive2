// @flow
import {
  computed,
  extendObservable,
  reaction,
  toJS,
} from 'mobx';

import { encodeTime } from '../util';

import type { IObservableArray } from 'mobx';

// TODO: mock
const storage = localStorage;
// eslint-disable-next-line
const isDev = __DEV__;


class RecordStore {
  items: IObservableArray<Log>;
  areaItems: IObservableArray<Log>;
  yaguraItems: IObservableArray<Log>;
  hokoItems: IObservableArray<Log>;

  constructor(key: string) {
    extendObservable(this, {
      items: [],
      areaItems: computed(() => {
        return this.items.filter(log => log.mode === 0);
      }),
      yaguraItems: computed(() => {
        return this.items.filter(log => log.mode === 1);
      }),
      hokoItems: computed(() => {
        return this.items.filter(log => log.mode === 2);
      }),
    });

    this._syncStorage(key);
  }

  add(seed: LogSeed): void {
    const log = Object.assign({}, seed, {
      id: encodeTime(Date.now()),
    });
    this.items.splice(0, 0, log);
  }

  del(log: Log): void {
    this.items.remove(log);
  }

  mod(log: Log): void {
    const targetIdx = this.items.findIndex(item => item.id === log.id);
    if (targetIdx !== -1) {
      this.items.splice(targetIdx, 1, log);
    }
  }

  _syncStorage(key: string): void {
    const stored = storage.getItem(key);
    if (typeof stored === 'string') {
      this.items.replace(JSON.parse(stored));
    }

    reaction(
      () => toJS(this.items),
      data => {
        storage.setItem(key, JSON.stringify(data));
        if (isDev) { console.log(data); }
      }
    );
  }
}

export default RecordStore;
