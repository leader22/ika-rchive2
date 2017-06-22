// @flow
import {
  computed,
  extendObservable,
  reaction,
  toJS,
} from 'mobx';

import {
  encodeTime,
  getGlobal,
} from '../util';
import recordToView from '../util/record-to-view';

import type { IObservableArray } from 'mobx';

// eslint-disable-next-line
const isDev = __DEV__;
const window = getGlobal();


class RecordStore {
  items: IObservableArray<Log>;
  noItem: boolean;
  view: {
    graph: Graph,
    stat: Stat,
  };
  lastRankAndPoint: LastRankAndPoint;

  constructor(key: string) {
    extendObservable(this, {
      items: [],
      noItem: computed(() => this.items.length === 0),
      view: computed(() => recordToView(this.items)),
      lastRankAndPoint: computed(() => {
        const lastRankAndPoint = new Map();

        let itemsLen = this.items.length;
        while (itemsLen--) {
          const item = this.items[itemsLen];
          lastRankAndPoint.has(item.md) || lastRankAndPoint.set(item.md, [item.rk, item.pt]);
          // ルールの数分だけあったらもう抜けてよい
          if (lastRankAndPoint.size === 3) { break; }
        }

        // 見つからなかったら初期値
        [0, 1, 2].forEach(mode => {
          lastRankAndPoint.has(mode) || lastRankAndPoint.set(mode, [0, 0]);
        });

        return lastRankAndPoint;
      }),
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
      this.items.splice(targetIdx, 1, log);
    }
  }

  _syncStorage(key: string): void {
    const stored = window.localStorage.getItem(key);
    if (typeof stored === 'string') {
      this.items.replace(JSON.parse(stored));
    }

    reaction(
      () => toJS(this.items),
      data => {
        window.localStorage.setItem(key, JSON.stringify(data));
        if (isDev) { console.log(data); }
      }
    );
  }
}

export default RecordStore;
