// @flow
import {
  computed,
  extendObservable,
} from 'mobx';

import { isValidLogSeed } from '../util';


class AddLogStore {
  mode: number;
  stage: number;
  stages: Array<number>
  stageLane: number;
  rank: number;
  point: number;
  result: number;
  canAdd: boolean;

  constructor() {
    extendObservable(this, {
      mode: 0,
      stages: [0, 1],
      stageLane: 0,
      stage: computed(() => {
        return this.stages[this.stageLane];
      }),
      rank: 0,
      point: 0,
      result: 0,
      canAdd: computed(() => {
        return isValidLogSeed(this.toJS());
      }),
    });
  }

  update(key: string, val: Object): void {
    switch (key) {
    case 'mode':
      this.mode = val.mode;
      break;
    case 'lane':
      this.stageLane = val.lane;
      break;
    case 'stage':
      this.stages[val.lane] = val.stage;
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

  toJS(): LogSeed {
    return {
      md: this.mode,
      st: this.stage,
      rk: this.rank,
      pt: this.point,
      rs: this.result,
    };
  }
}

export default AddLogStore;
