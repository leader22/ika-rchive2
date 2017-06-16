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

  totalWinCount: number,
  totalLoseCount: number,
  areaWinCount: number,
  areaLoseCount: number,
  yaguraWinCount: number,
  yaguraLoseCount: number,
  hokoWinCount: number,
  hokoLoseCount: number,

  totalWinRate: number,
  areaWinRate: number,
  yaguraWinRate: number,
  hokoWinRate: number,
};

function toStat(): Stat {
  const items = this.items;
  let itemsLen = items.length;

  const stat = {
    totalPlayCount: 0,
    areaPlayCount: 0,
    yaguraPlayCount: 0,
    hokoPlayCount: 0,

    totalWinCount: 0,
    totalLoseCount: 0,
    areaWinCount: 0,
    areaLoseCount: 0,
    yaguraWinCount: 0,
    yaguraLoseCount: 0,
    hokoWinCount: 0,
    hokoLoseCount: 0,

    totalWinRate: 0,
    areaWinRate: 0,
    yaguraWinRate: 0,
    hokoWinRate: 0,
  };

  while (itemsLen--) {
    const item = items[itemsLen];

    _assignPlayCount(stat, item);
    _assignWinCount(stat, item);
  }

  _assignWinRate(stat);
  _assignLoseCount(stat);

  return stat;
}

function _assignPlayCount(stat: Stat, item: Log): void {
  stat.totalPlayCount++;
  (item.mode === 0) && stat.areaPlayCount++;
  (item.mode === 1) && stat.yaguraPlayCount++;
  (item.mode === 2) && stat.hokoPlayCount++;
}
function _assignWinCount(stat: Stat, item: Log): void {
  item.result && stat.totalWinCount++;
  (item.mode === 0 && item.result) && stat.areaWinCount++;
  (item.mode === 1 && item.result) && stat.yaguraWinCount++;
  (item.mode === 2 && item.result) && stat.hokoWinCount++;
}
function _assignWinRate(stat: Stat): void {
  stat.totalWinRate = __percentage(stat.totalWinCount, stat.totalPlayCount, 2);
  stat.areaWinRate = __percentage(stat.areaWinCount, stat.areaPlayCount, 2);
  stat.yaguraWinRate = __percentage(stat.yaguraWinCount, stat.yaguraPlayCount, 2);
  stat.hokoWinRate = __percentage(stat.hokoWinCount, stat.hokoPlayCount, 2);
}
function _assignLoseCount(stat: Stat): void {
  stat.totalLoseCount = stat.totalPlayCount - stat.totalWinCount;
  stat.areaLoseCount = stat.areaPlayCount - stat.areaWinCount;
  stat.yaguraLoseCount = stat.yaguraPlayCount - stat.yaguraWinCount;
  stat.hokoLoseCount = stat.hokoPlayCount - stat.hokoWinCount;
}

function __percentage(c: number, p: number, n: number) {
  if (c === 0 || p === 0) { return 0; }

  const rate = c / p * 100;
  const pow = Math.pow(10, n);
  return Math.round(rate * pow) / pow;
}
