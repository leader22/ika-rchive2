// @flow
import React from 'react';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import MultiStageInputVM from './vm';


class MultiStageInput extends React.Component {
  _vm: MultiStageInputVM;
  _disposer: () => mixed;

  props: {|
    onChangeStage?: (number) => void,
    setting: Setting,
  |};

  constructor(props) {
    super(props);
    this._vm = new MultiStageInputVM();
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
            checked={this._vm.stageLane === lane}
            onChange={this._vm.onChangeLane}
          />
          <select
            name={lane}
            onChange={ev => this._vm.onChangeStage(lane, ev.target.value)}
            value={this._vm.stages[lane]}
          >
            { setting.STAGE.map((v, idx) => (
            <option key={idx} value={idx}>{v}</option>
            )) }
          </select>
        </div>
        )) }
      </div>
    );
  }

  componentDidMount() {
    this._disposer = reaction(
      () => this._vm.stage,
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
