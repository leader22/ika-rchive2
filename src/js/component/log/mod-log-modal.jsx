// @flow
import React from 'react';
import { computed, extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';

// import ModeInput from '../shared/mode-input';
import RateInput from '../shared/rate-input';
import ResultInput from '../shared/result-input';
import SingleBtn from '../shared/single-btn';
// import StageInput from './stage-input';

import type UiStore from '../../store/ui';
import type Event from '../../event';

const rateToRankAndPoint = (rate) => {
  const rank = ((rate / 100)|0) * 100;
  return {
    rank: rank,
    point: rate - rank
  };
};

class ModLogModal extends React.Component {
  _mode: number;
  _stage: number;
  _rate: number;
  _rank: number;
  _point: number;
  _result: number;
  _canMod: boolean;
  _onChangeMode: (number) => void;
  _onChangeStage: (number) => void;
  _onChangeRate: (Rate) => void;
  _onChangeResult: (number) => void;
  _onClickMod: () => void;

  props: {|
    ui: UiStore,
    event: Event,
  |};

  constructor(props) {
    super(props);

    extendObservable(this, {
      _mode: 1,
      _stage: 1,
      _rate: computed(() => {
        return this._rank + this._point;
      }),
      _rank: 0,
      _point: 0,
      _result: 1,
      _canMod: computed(() => {
        if (isNaN(this._point)) { return false; }
        return true;
      }),
    });

    this._onChangeMode = mode => {
      this._mode = mode;
    };
    this._onChangeStage = stage => {
      this._stage = stage;
    };
    this._onChangeRate = ({ rank, point }) => {
      this._rank = rank;
      this._point = point;
    };
    this._onChangeResult = result => {
      this._result = result;
    };
    this._onClickMod = () => {
      // this.props.event.onClickModLog({
      //   mode: this._mode,
      //   stage: this._stage,
      //   rate: this._rate,
      //   result: this._result,
      // });
    };
  }

  render() {
    const { ui, event } = this.props;
    const { modLog } = ui;

    console.log(modLog);
    if (modLog === null) {
      return null;
    }

    return (
      <div className={`mod-log-modal ${ui.isModLogModalOpen ? 'mod-log-modal--opened' : ''}`}>
        <header className="app-header">
          <button
            className="app-header__action"
            type="button"
            onClick={event.onClickCloseModLogModal}
          >
            <span className="ft-ika">キャンセル</span>
          </button>
        </header>
        <div>
        {/*
          <ModeInput
            mode={modLog.mode}
            onChangeMode={this._onChangeMode}
          />
          <StageInput
            onChangeStage={this._onChangeStage}
          />
        */}
          <RateInput
            rank={rateToRankAndPoint(modLog.rate).rank}
            point={rateToRankAndPoint(modLog.rate).point}
            onChangeRate={this._onChangeRate}
          />
          <ResultInput
            result={modLog.result}
            onChangeResult={this._onChangeResult}
          />
          <SingleBtn
            onClick={this._onClickMod}
            disabled={this._canMod === false}
            text="シュウセイ"
          />
        </div>
      </div>
    );
  }
}

export default inject(
  'ui',
  'event',
)(observer(ModLogModal));
