// @flow
import {
  computed,
  extendObservable,
} from 'mobx';
import { bindThis } from '../../../util';


class AddLogFormVM {
  mode: number;
  stage: number;
  stages: Array<number>
  stageLane: number;
  rank: number;
  point: number;
  result: number;
  canAdd: boolean;
  _lastRankAndPoint: LastRankAndPoint;

  constructor(lastRankAndPoint: LastRankAndPoint) {
    bindThis(this);

    this._lastRankAndPoint = lastRankAndPoint;

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
        if (isNaN(this.point)) { return false; }
        if (this.point > 99) { return false; }
        if (this.point < 0) { return false; }
        return true;
      }),
    });

    this._applyLastRankAndPoint();
  }

  onChangeMode(mode: number): void {
    this.mode = mode;
    this._applyLastRankAndPoint();
  }
  onChangeLane(lane: number): void {
    this.stageLane = lane;
  }
  onChangeStage(lane: number, stage: number): void {
    this.stages[lane] = stage;
  }
  onChangeRate(rank: number, point: number): void {
    this.rank = rank;
    this.point = point;
  }
  onChangeResult(result: number): void {
    this.result = result;
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

  _applyLastRankAndPoint(): void {
    const [ rank, point ] = this._lastRankAndPoint[String(this.mode)];
    this.rank = rank;
    this.point = point;
  }
}

export default AddLogFormVM;
