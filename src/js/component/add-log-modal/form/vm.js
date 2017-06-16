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

  constructor() {
    bindThis(this);

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
  }

  onChangeMode(mode: number): void {
    this.mode = mode;
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
      mode: this.mode,
      stage: this.stage,
      rank: this.rank,
      point: this.point,
      result: this.result,
    };
  }
}

export default AddLogFormVM;
