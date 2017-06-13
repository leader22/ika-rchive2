// @flow
import React from 'react';
import { computed, extendObservable, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';


class MultiStageInput extends React.Component {
  _stage: number;
  _stages: Array<number>
  _stageLane: number;
  _onChangeLane: (SyntheticInputEvent) => void;
  _onChangeStage: (number, number) => void;
  _disposer: () => mixed;

  props: {|
    onChangeStage?: (number) => void,
    setting: Setting,
  |};

  constructor(props) {
    super(props);

    extendObservable(this, {
      _stages: [1, 2],
      _stageLane: 0,
      _stage: computed(() => {
        return this._stages[this._stageLane];
      })
    });

    this._onChangeLane = (ev: SyntheticInputEvent) => {
      this._stageLane = parseInt(ev.target.value);
    };
    this._onChangeStage = (lane, stage) => {
      this._stages[lane] = parseInt(stage);
    };
  }

  render() {
    const { setting } = this.props;

    return (
      <div className="multi-stage-input">
        { [0, 1].map(lane => (
        <div key={lane} className="multi-stage-input__row">
          <input
            className="multi-stage-input__row__lane"
            type="radio"
            name="stageLane"
            value={lane}
            checked={this._stageLane === lane}
            onChange={this._onChangeLane}
          />
          <select
            name={lane}
            onChange={ev => this._onChangeStage(lane, ev.target.value)}
            value={this._stages[lane]}
          >
            { Object.entries(setting.STAGE).map((kv, idx) => (
            <option key={idx} value={kv[0]}>{kv[1]}</option>
            )) }
          </select>
        </div>
        )) }
      </div>
    );
  }

  componentDidMount() {
    this._disposer = reaction(
      () => this._stage,
      stage => {
        if (typeof this.props.onChangeStage === 'function') {
          this.props.onChangeStage(stage);
        }
      }
    );
  }

  componentWillUnmount() {
    this._disposer();
  }
}

export default inject(
  'setting',
)(observer(MultiStageInput));
