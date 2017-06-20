// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import AddLogFormVM from './vm';
import ModeInput from '../../shared/mode-input';
import RateInput from '../../shared/rate-input';
import ResultInput from '../../shared/result-input';
import SingleBtn from '../../shared/single-btn';
import MultiStageInput from './multi-stage-input';

import type UiStore from '../../../store/ui';
import type Event from '../../../event';


class AddLogForm extends React.Component {
  _vm: AddLogFormVM;
  _onClickAdd: () => void;

  props: {|
    ui: UiStore,
    event: Event,
  |};

  constructor(props) {
    super(props);

    this._vm = new AddLogFormVM();
    this._onClickAdd = () => {
      this.props.event.onClickAddLog(this._vm.toJS());
    };
  }

  render() {
    const { ui } = this.props;

    if (ui.isAddLogModalOpen === false) {
      return null;
    }

    return (
      <div>
        <ModeInput
          mode={this._vm.mode}
          onChangeMode={this._vm.onChangeMode}
        />
        <MultiStageInput
          stageLane={this._vm.stageLane}
          stages={this._vm.stages}
          onChangeLane={this._vm.onChangeLane}
          onChangeStage={this._vm.onChangeStage}
        />
        <RateInput
          rank={this._vm.rank}
          point={this._vm.point}
          onChangeRate={this._vm.onChangeRate}
        />
        <ResultInput
          result={this._vm.result}
          onChangeResult={this._vm.onChangeResult}
        />
        <SingleBtn
          onClick={this._onClickAdd}
          disabled={this._vm.canAdd === false}
          text="これでキロク"
          textClicked="カンリョウ!"
        />
      </div>
    );
  }
}

export default inject(
  'ui',
  'event',
)(observer(AddLogForm));
