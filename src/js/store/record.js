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
  graph: {
    areaRate: Array<number>,
    yaguraRate: Array<number>,
    hokoRate: Array<number>,
  };
  stat: Stat;

  constructor(key: string) {
    extendObservable(this, {
      items: [],
      noItem: computed(() => this.items.length === 0),
      graph: {
        areaRate: computed(() => {
          return this.items.filter(log => log.mode === 0)
                           .map(log => (log.rank * 100) + log.point);
        }),
        yaguraRate: computed(() => {
          return this.items.filter(log => log.mode === 1)
                           .map(log => (log.rank * 100) + log.point);
        }),
        hokoRate: computed(() => {
          return this.items.filter(log => log.mode === 2)
                           .map(log => (log.rank * 100) + log.point);
        }),
      },
      stat: computed(toStat),
    });

    this._syncStorage(key);
  }

  add(seed: LogSeed): void {
    const log = Object.assign({}, seed, {
      id: encodeTime(Date.now()),
    });
    this.items.push(log);
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

    areaByStage: {},
    yaguraByStage: {},
    hokoByStage: {},
  };

  while (itemsLen--) {
    const item = items[itemsLen];

    _assignPlayCount(stat, item);
    _assignWinCount(stat, item);
    _assignBestRate(stat, item);
    _assignStagePlayAndWinCount(stat, item);
  }

  _assignWinP(stat);
  _assignLoseCount(stat);
  _assignAvgRate(stat);
  _assignStageWinP(stat);
  _assignStageLoseCount(stat);

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
function _assignStagePlayAndWinCount(stat: Stat, item: Log): void {
  const { stage, mode, result } = item;
  stage in stat.areaByStage || (stat.areaByStage[stage] = __getByStage());
  stage in stat.yaguraByStage || (stat.yaguraByStage[stage] = __getByStage());
  stage in stat.hokoByStage || (stat.hokoByStage[stage] = __getByStage());
  mode === 0 && stat.areaByStage[stage].playCount++;
  mode === 1 && stat.yaguraByStage[stage].playCount++;
  mode === 2 && stat.hokoByStage[stage].playCount++;
  (mode === 0 && result) && stat.areaByStage[stage].winCount++;
  (mode === 1 && result) && stat.yaguraByStage[stage].winCount++;
  (mode === 2 && result) && stat.hokoByStage[stage].winCount++;
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
function _assignStageWinP(stat: Stat): void {
  for (let key in stat.areaByStage) {
    const val = stat.areaByStage[Number(key)];
    val.winP = __percentage(val.winCount, val.playCount, 2);
  }
  for (let key in stat.yaguraByStage) {
    const val = stat.yaguraByStage[Number(key)];
    val.winP = __percentage(val.winCount, val.playCount, 2);
  }
  for (let key in stat.hokoByStage) {
    const val = stat.hokoByStage[Number(key)];
    val.winP = __percentage(val.winCount, val.playCount, 2);
  }
}
function _assignStageLoseCount(stat: Stat): void {
  for (let key in stat.areaByStage) {
    const val = stat.areaByStage[Number(key)];
    val.loseCount = val.playCount - val.winCount;
  }
  for (let key in stat.yaguraByStage) {
    const val = stat.yaguraByStage[Number(key)];
    val.loseCount = val.playCount - val.winCount;
  }
  for (let key in stat.hokoByStage) {
    const val = stat.hokoByStage[Number(key)];
    val.loseCount = val.playCount - val.winCount;
  }
}

function __getByStage(): ByStage {
  return {
    playCount: 0,
    winCount: 0,
    loseCount: 0,
    winP: 0,
  };
}
function __percentage(c: number, p: number, n: number) {
  if (c === 0 || p === 0) {
    return 0;
  }

  const rate = c / p * 100;
  const pow = Math.pow(10, n);
  return Math.round(rate * pow) / pow;
}
