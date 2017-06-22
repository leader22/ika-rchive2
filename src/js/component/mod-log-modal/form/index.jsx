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

    this._onChangeMode = md => {
      this.props.event.onChangeModLog({ md });
    };
    this._onChangeStage = st => {
      this.props.event.onChangeModLog({ st });
    };
    this._onChangeRate = (rk, pt) => {
      this.props.event.onChangeModLog({ rk, pt });
    };
    this._onChangeResult = rs => {
      this.props.event.onChangeModLog({ rs });
    };
    this._onClickMod = () => {
      this.props.event.onClickModLog();
    };
  }

  render() {
    const {
      isModLogModalOpen,
      modLog,
      canModLog,
    } = this.props.ui;

    if (isModLogModalOpen === false) {
      return null;
    }

    return (
      <div>
        <ModeInput
          mode={modLog.md}
          onChangeMode={this._onChangeMode}
        />
        <StageInput
          stage={modLog.st}
          onChangeStage={this._onChangeStage}
        />
        <RateInput
          rank={modLog.rk}
          point={modLog.pt}
          onChangeRate={this._onChangeRate}
        />
        <ResultInput
          result={modLog.rs}
          onChangeResult={this._onChangeResult}
        />
        <SingleBtn
          onClick={this._onClickMod}
          disabled={canModLog === false}
          text="これでシュウセイ"
          textClicked="カンリョウ!"
        />
      </div>
    );
  }
}

export default inject(
  'ui',
  'event',
)(observer(ModLogForm));
