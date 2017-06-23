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
  asSeed: LogSeed;
  lastRate: Array<Array<number>>;

  constructor() {
    // このセッション開始時のウデマエ
    this.lastRate = [];

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
        return isValidLogSeed(this.asSeed);
      }),
      asSeed: computed(() => {
        return {
          md: this.mode,
          st: this.stage,
          rk: this.rank,
          pt: this.point,
          rs: this.result,
        };
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

  applyLastRankAndPoint(lastRankAndPoint: LastRankAndPoint): void {
    const rankAndPoint = lastRankAndPoint.get(this.mode);
    if (Array.isArray(rankAndPoint)) {
      this.rank = rankAndPoint[0];
      this.point = rankAndPoint[1];
    }
  }

  copyLastRankAndPoint(lastRankAndPoint: LastRankAndPoint): void {
    for (let kv of lastRankAndPoint) {
      const [md, [rk, pt]] = kv;
      this.lastRate[md] = [rk, pt];
    }
  }
}

export default AddLogStore;
