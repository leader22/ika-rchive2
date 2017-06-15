// @flow
import { runInAction } from 'mobx';

export default {
  addAreaRecord(num: number) {
    _addRecord(0, num);
  },
  addYaguraRecord(num: number) {
    _addRecord(1, num);
  },
  addHokoRecord(num: number) {
    _addRecord(2, num);
  },
  resetAreaRecord() {
    _resetRecord(0);
  },
  resetYaguraRecord() {
    _resetRecord(1);
  },
  resetHokoRecord() {
    _resetRecord(2);
  },
};


function _addRecord(mode, num) {
  const record = window.store.record;

  let point = 0;
  let rank = 0;
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

      const seed = {
        mode: mode,
        stage: __nToM(1, 6),
        result: isWin ? 1 : 0,
        rank: rank,
        point: point,
      };
      record.add(seed);
    }
  });
}

function _resetRecord(mode) {
  const items = window.store.record.items;

  const restItems = items.peek().filter(log => log.mode !== mode);
  items.replace(restItems);
}

function __oneOrZero() {
  return Math.floor(Math.random()*2);
}

function __nToM(n, m) {
  return Math.floor(Math.random()*m)+n;
}

