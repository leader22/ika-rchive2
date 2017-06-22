// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import ModeInput from '../../shared/mode-input';
import RateInput from '../../shared/rate-input';
import ResultInput from '../../shared/result-input';
import SingleBtn from '../../shared/single-btn';
import MultiStageInput from './multi-stage-input';

import type AddLogStore from '../../../store/add-log';
import type UiStore from '../../../store/ui';
import type Event from '../../../event';


class AddLogForm extends React.Component {
  props: {|
    addLog: AddLogStore,
    ui: UiStore,
    event: Event,
  |};

  render() {
    const {
      mode, onChangeMode,
      stageLane, stages, onChangeLane, onChangeStage,
      rank, point, onChangeRate,
      result, onChangeResult,
      canAdd,
    } = this.props.addLog;
    const { onClickAddLog } = this.props.event;
    const { isAddLogModalOpen } = this.props.ui;

    if (isAddLogModalOpen === false) {
      return null;
    }

    return (
      <div>
        <ModeInput
          mode={mode}
          onChangeMode={onChangeMode}
        />
        <MultiStageInput
          stageLane={stageLane}
          stages={stages}
          onChangeLane={onChangeLane}
          onChangeStage={onChangeStage}
        />
        <RateInput
          rank={rank}
          point={point}
          onChangeRate={onChangeRate}
        />
        <ResultInput
          result={result}
          onChangeResult={onChangeResult}
        />
        <SingleBtn
          onClick={onClickAddLog}
          disabled={canAdd === false}
          text="これでキロク"
          textClicked="カンリョウ!"
        />
      </div>
    );
  }
}

export default inject(
  'addLog',
  'ui',
  'event',
)(observer(AddLogForm));
