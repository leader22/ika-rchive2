// @flow
import {
  computed,
  extendObservable,
} from 'mobx';

import { isValidLogSeed } from '../util';


class ModLogStore {
  id: number;
  mode: number;
  weapon: string;
  stage: number;
  rank: number;
  point: number;
  result: number;
  canMod: boolean;
  asLog: Log;

  constructor() {
    extendObservable(this, {
      id: 0,
      mode: 0,
      weapon: '',
      stage: 0,
      rank: 0,
      point: 0,
      result: 0,
      canMod: computed(() => {
        return isValidLogSeed(this.asLog);
      }),
      asLog: computed(() => {
        return {
          id: this.id,
          wp: this.weapon,
          md: this.mode,
          st: this.stage,
          rk: this.rank,
          pt: this.point,
          rs: this.result,
        };
      })
    });
  }

  init(log: Log): void {
    this.id = log.id;
    this.mode = log.md;
    this.weapon = log.wp;
    this.stage = log.st;
    this.rank = log.rk;
    this.point = log.pt;
    this.result = log.rs;
  }

  update(key: string, val: Object): void {
    switch (key) {
    case 'mode':
      this.mode = val.mode;
      break;
    case 'weapon':
      this.weapon = val.weapon;
      break;
    case 'stage':
      this.stage = val.stage;
      break;
    case 'rate':
      this.rank = val.rank;
      this.point = val.point;
      break;
    case 'result':
      this.result = val.result;
      break;
    default:
      return;
    }
  }
}

export default ModLogStore;
