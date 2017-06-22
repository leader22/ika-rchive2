// @flow
import {
  computed,
  extendObservable,
  // runInAction,
  // toJS,
} from 'mobx';

import { isValidLogSeed } from '../util';


class ModLogStore {
  id: number;
  mode: number;
  stage: number;
  rank: number;
  point: number;
  result: number;
  canMod: boolean;

  constructor() {
    extendObservable(this, {
      id: 0,
      mode: 0,
      stage: 0,
      rank: 0,
      point: 0,
      result: 0,
      canMod: computed(() => {
        return isValidLogSeed(this.toJS());
      }),
    });
  }

  init(log: Log): void {
    this.id = log.id;
    this.mode = log.md;
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

  toJS(): Log {
    return {
      id: this.id,
      md: this.mode,
      st: this.stage,
      rk: this.rank,
      pt: this.point,
      rs: this.result,
    };
  }
}

export default ModLogStore;
