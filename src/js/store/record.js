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
  stat: Stat;

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
      stat: computed(toStat),
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
      this.items.splice(targetIdx, 1, toJS(log));
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

// TODO: 移動
type Stat = {
  totalPlayCount: number,
  areaPlayCount: number,
  yaguraPlayCount: number,
  hokoPlayCount: number,
};

function toStat(): Stat {
  const items = this.items;
  let itemsLen = items.length;

  const stat = {
    totalPlayCount: itemsLen,
    areaPlayCount: 0,
    yaguraPlayCount: 0,
    hokoPlayCount: 0,
  };

  while (itemsLen--) {
    const item = items[itemsLen];

    _assignPlayCount(stat, item);
  }

  return stat;

  function _assignPlayCount(stat, item) {
    if (item.mode === 0) { stat.areaPlayCount++; }
    if (item.mode === 1) { stat.yaguraPlayCount++; }
    if (item.mode === 2) { stat.hokoPlayCount++; }
  }
}
