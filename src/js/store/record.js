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

  totalWinP: number,
  areaWinP: number,
  yaguraWinP: number,
  hokoWinP: number,

  areaBestRate: number,
  yaguraBestRate: number,
  hokoBestRate: number,
  _areaTotalRate: number,
  _yaguraTotalRate: number,
  _hokoTotalRate: number,
  areaAvgRate: number,
  yaguraAvgRate: number,
  hokoAvgRate: number,
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

    totalWinP: 0,
    areaWinP: 0,
    yaguraWinP: 0,
    hokoWinP: 0,

    areaBestRate: 0,
    yaguraBestRate: 0,
    hokoBestRate: 0,
    _areaTotalRate: 0,
    _yaguraTotalRate: 0,
    _hokoTotalRate: 0,
    areaAvgRate: 0,
    yaguraAvgRate: 0,
    hokoAvgRate: 0,
  };

  while (itemsLen--) {
    const item = items[itemsLen];

    _assignPlayCount(stat, item);
    _assignWinCount(stat, item);
    _assignBestRate(stat, item);
  }

  _assignWinP(stat);
  _assignLoseCount(stat);
  _assignAvgRate(stat);

  return stat;
}

function _assignPlayCount(stat: Stat, item: Log): void {
  stat.totalPlayCount++;
  item.mode === 0 && stat.areaPlayCount++;
  item.mode === 1 && stat.yaguraPlayCount++;
  item.mode === 2 && stat.hokoPlayCount++;
}
function _assignWinCount(stat: Stat, item: Log): void {
  item.result && stat.totalWinCount++;
  (item.mode === 0 && item.result) && stat.areaWinCount++;
  (item.mode === 1 && item.result) && stat.yaguraWinCount++;
  (item.mode === 2 && item.result) && stat.hokoWinCount++;
}
function _assignBestRate(stat: Stat, item: Log): void {
  const rate = (item.rank * 100) + item.point;
  item.mode === 0 && (stat.areaBestRate = Math.max(stat.areaBestRate, rate));
  item.mode === 1 && (stat.yaguraBestRate = Math.max(stat.yaguraBestRate, rate));
  item.mode === 2 && (stat.hokoBestRate = Math.max(stat.hokoBestRate, rate));
  item.mode === 0 && (stat._areaTotalRate += rate);
  item.mode === 1 && (stat._yaguraTotalRate += rate);
  item.mode === 2 && (stat._hokoTotalRate += rate);
}
function _assignWinP(stat: Stat): void {
  stat.totalWinP = __percentage(stat.totalWinCount, stat.totalPlayCount, 2);
  stat.areaWinP = __percentage(stat.areaWinCount, stat.areaPlayCount, 2);
  stat.yaguraWinP = __percentage(stat.yaguraWinCount, stat.yaguraPlayCount, 2);
  stat.hokoWinP = __percentage(stat.hokoWinCount, stat.hokoPlayCount, 2);
}
function _assignLoseCount(stat: Stat): void {
  stat.totalLoseCount = stat.totalPlayCount - stat.totalWinCount;
  stat.areaLoseCount = stat.areaPlayCount - stat.areaWinCount;
  stat.yaguraLoseCount = stat.yaguraPlayCount - stat.yaguraWinCount;
  stat.hokoLoseCount = stat.hokoPlayCount - stat.hokoWinCount;
}
function _assignAvgRate(stat: Stat): void {
  stat.areaAvgRate = (stat._areaTotalRate / stat.areaPlayCount)|0;
  stat.yaguraAvgRate = (stat._yaguraTotalRate / stat.yaguraPlayCount)|0;
  stat.hokoAvgRate = (stat._hokoTotalRate / stat.hokoPlayCount)|0;
}

function __percentage(c: number, p: number, n: number) {
  if (c === 0 || p === 0) {
    return 0;
  }

  const rate = c / p * 100;
  const pow = Math.pow(10, n);
  return Math.round(rate * pow) / pow;
}
