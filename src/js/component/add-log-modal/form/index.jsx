// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import ModeInput from '../../shared/mode-input';
import RateInput from '../../shared/rate-input';
import ResultInput from '../../shared/result-input';
import WeaponInput from '../../shared/weapon-input';
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
    weapon,
    stageLane, stages,
    rank, point,
    result,
    canAdd,
  } = addLog;
  const { onClickAddLog } = event;
  const { onChangeAddLog } = event.addLog;

  if (isAddLogModalOpen === false) {
    return null;
  }

  return (
    <div className="log-form">
      <h2>ウデマエのキロク</h2>
      <div className="input-group">
        <ModeInput
          mode={mode}
          onChangeMode={mode => onChangeAddLog('mode', { mode })}
        />
        <WeaponInput
          weapon={weapon}
          onChangeWeapon={weapon => onChangeAddLog('weapon', { weapon })}
        />
      </div>
      <div className="input-group">
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
      </div>
      <SingleBtn
        onClick={onClickAddLog}
        disabled={canAdd === false}
        text="これでキロク"
        textProcessing="ショリチュウ..."
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
