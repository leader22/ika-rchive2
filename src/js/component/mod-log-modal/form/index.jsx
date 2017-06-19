// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import ModeInput from '../../shared/mode-input';
import RateInput from '../../shared/rate-input';
import ResultInput from '../../shared/result-input';
import SingleBtn from '../../shared/single-btn';
import StageInput from './stage-input';

import type UiStore from '../../../store/ui';
import type Event from '../../../event';


class ModLogForm extends React.Component {
  _onChangeMode: (number) => void;
  _onChangeStage: (number) => void;
  _onChangeRate: (number, number) => void;
  _onChangeResult: (number) => void;
  _onClickMod: () => void;

  props: {|
    ui: UiStore,
    event: Event,
  |};

  constructor(props) {
    super(props);

    this._onChangeMode = mode => {
      this.props.event.onChangeModLog({ mode });
    };
    this._onChangeStage = stage => {
      this.props.event.onChangeModLog({ stage });
    };
    this._onChangeRate = (rank, point) => {
      this.props.event.onChangeModLog({ rank, point });
    };
    this._onChangeResult = result => {
      this.props.event.onChangeModLog({ result });
    };
    this._onClickMod = () => {
      this.props.event.onClickModLog();
    };
  }

  render() {
    const { ui } = this.props;
    const { modLog } = ui;

    if (ui.isModLogModalOpen === false) {
      return null;
    }

    return (
      <div>
        <ModeInput
          mode={modLog.mode}
          onChangeMode={this._onChangeMode}
        />
        <StageInput
          stage={modLog.stage}
          onChangeStage={this._onChangeStage}
        />
        <RateInput
          rank={modLog.rank}
          point={modLog.point}
          onChangeRate={this._onChangeRate}
        />
        <ResultInput
          result={modLog.result}
          onChangeResult={this._onChangeResult}
        />
        <SingleBtn
          onClick={this._onClickMod}
          disabled={false}
          text="これでシュウセイ"
          textClicked="シュウセイカンリョウ!"
        />
      </div>
    );
  }
}

export default inject(
  'ui',
  'event',
)(observer(ModLogForm));
