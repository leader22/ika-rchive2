// @flow
import {
  computed,
  extendObservable,
  toJS,
} from 'mobx';


class AddLogFormVM {
  mode: number;
  stage: number;
  rank: number;
  point: number;
  result: number;
  canAdd: boolean;
  onChangeMode: (number) => void;
  onChangeStage: (number) => void;
  onChangeRate: (number, number) => void;
  onChangeResult: (number) => void;

  constructor() {
    extendObservable(this, {
      mode: 0,
      stage: 0,
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

    this.onChangeMode = (mode) => {
      this.mode = mode;
    };
    this.onChangeStage = (stage) => {
      this.stage = stage;
    };
    this.onChangeRate = (rank, point) => {
      this.rank = rank;
      this.point = point;
    };
    this.onChangeResult = (result) => {
      this.result = result;
    };
  }

  toJS() {
    return toJS(this);
  }
}

export default AddLogFormVM;
