// @flow
import { runInAction } from 'mobx';

function addAreaRecord(num: number) {
  _addRecord('1', num);
}

function addYaguraRecord(num: number) {
  _addRecord('2', num);
}

function addHokoRecord(num: number) {
  _addRecord('3', num);
}

export default {
  addAreaRecord,
  addYaguraRecord,
  addHokoRecord,
};

function _addRecord(mode, num) {
  const record = window.store[`record${mode}`];
  let rate = record.items.length ? record.items[0].rate : 0;

  runInAction(() => {
    for (let i = 0; i < num; i++) {
      rate = _nToM(0, 5) ? _nToM(8, 20) : -_nToM(1, 5);
      if (rate <= 0) rate = 0;
      const seed = {
        mode: mode,
        stage: _nToM(1, 6),
        result: _nToM(1, 2),
        rate: rate,
      };
      record.add(seed);
    }
  });
}

// function _oneOrZero() {
//   return Math.floor(Math.random()*2);
// }

function _nToM(n, m) {
  return Math.floor(Math.random()*m)+n;
}

