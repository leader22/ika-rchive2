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


const AddLogForm = ({
  addLog,
  ui,
  event,
}: {
  addLog: AddLogStore,
  ui: UiStore,
  event: Event,
}) => {
  const { isAddLogModalOpen } = ui;
  const {
    mode,
    stageLane, stages,
    rank, point,
    result,
    canAdd,
  } = addLog;
  const {
    onClickAddLog,
    onChangeAddLog,
  } = event;

  if (isAddLogModalOpen === false) {
    return null;
  }

  return (
    <div>
      <h3>ウデマエのキロク</h3>
      <ModeInput
        mode={mode}
        onChangeMode={mode => onChangeAddLog('mode', { mode })}
      />
      <MultiStageInput
        stageLane={stageLane}
        stages={stages}
        onChangeLane={lane => onChangeAddLog('lane', { lane })}
        onChangeStage={(lane, stage) => onChangeAddLog('stage', { lane, stage })}
      />
      <RateInput
        rank={rank}
        point={point}
        onChangeRate={(rank, point) => onChangeAddLog('rate', { rank, point })}
      />
      <ResultInput
        result={result}
        onChangeResult={result => onChangeAddLog('result', { result })}
      />
      <SingleBtn
        onClick={onClickAddLog}
        disabled={canAdd === false}
        text="これでキロク"
        textClicked="カンリョウ!"
      />
    </div>
  );
};

export default inject(
  'addLog',
  'ui',
  'event',
)(observer(AddLogForm));
