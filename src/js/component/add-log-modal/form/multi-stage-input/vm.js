// @flow
import {
  computed,
  extendObservable,
} from 'mobx';


class MultiStageInputVM {
  stage: number;
  stages: Array<number>
  stageLane: number;
  onChangeLane: (SyntheticInputEvent) => void;
  onChangeStage: (number, number) => void;

  constructor() {
    extendObservable(this, {
      stages: [1, 2],
      stageLane: 0,
      stage: computed(() => {
        return this.stages[this.stageLane];
      })
    });

    this.onChangeLane = (ev: SyntheticInputEvent) => {
      this.stageLane = parseInt(ev.target.value);
    };

    this.onChangeStage = (lane, stage) => {
      this.stages[lane] = parseInt(stage);
    };
  }
}

export default MultiStageInputVM;
