// @flow
import { runInAction } from 'mobx';
import type Store from '../store';


export default class Debug {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  addAreaRecord(num: number) {
    this._addRecord(0, num);
  }
  addYaguraRecord(num: number) {
    this._addRecord(1, num);
  }
  addHokoRecord(num: number) {
    this._addRecord(2, num);
  }

  resetAreaRecord() {
    this._resetRecord(0);
  }
  resetYaguraRecord() {
    this._resetRecord(1);
  }
  resetHokoRecord() {
    this._resetRecord(2);
  }

  _addRecord(mode, num) {
    const record = this.store.record;
    const lastRP = record.lastRankAndPoint.get(mode);
    let [ rank, point ] = lastRP || [0, 0];

    runInAction(() => {
      for (let i = 0; i < num; i++) {
        const isWin = Boolean(__oneOrZero());
        point +=  isWin ? __nToM(8, 20) : -__nToM(1, 8);

        // ランクアップ
        if (point >= 100) { rank++; point = 30; }
        // ランクダウン
        if (point < 0) { rank--; point = 70; }
        // 下限
        if (rank < 0) { rank = 0; }
        // 上限
        if (rank > 10) { rank = 10; point = 99; }

        const seed = {
          md: mode,
          wp: '',
          st: __nToM(0, 5),
          rs: isWin ? 1 : 0,
          rk: rank,
          pt: point,
        };
        record.add(seed);
      }
    });
  }

  _resetRecord(mode) {
    const items = this.store.record.items;

    const restItems = items.peek().filter(log => log.md !== mode);
    items.replace(restItems);
  }
}


function __oneOrZero() {
  return Math.floor(Math.random()*2);
}

function __nToM(n, m) {
  return Math.floor(Math.random()*m)+n;
}
