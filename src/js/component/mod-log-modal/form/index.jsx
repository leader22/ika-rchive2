// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import ModeInput from '../../shared/mode-input';
import WeaponInput from '../../shared/weapon-input';
import RateInput from '../../shared/rate-input';
import ResultInput from '../../shared/result-input';
import SingleBtn from '../../shared/single-btn';
import StageInput from './stage-input';

import type UiStore from '../../../store/ui';
import type ModLogStore from '../../../store/mod-log';
import type Event from '../../../event';


const ModLogForm = ({
  ui,
  modLog,
  event,
}: {
  ui: UiStore,
  modLog: ModLogStore,
  event: Event,
}) => {
  const { isModLogModalOpen } = ui;
  const { onClickModLog } = event;
  const { onChangeModLog } = event.modLog;
  const {
    mode,
    weapon,
    stage,
    rank,
    point,
    result,
    canMod,
  } = modLog;

  if (isModLogModalOpen === false) {
    return null;
  }

  return (
    <div className="log-form">
      <h2>キロクのシュウセイ</h2>
      <ModeInput
        mode={mode}
        onChangeMode={mode => onChangeModLog('mode', { mode })}
      />
      <WeaponInput
        weapon={weapon}
        onChangeWeapon={weapon => onChangeModLog('weapon', { weapon })}
      />
      <StageInput
        stage={stage}
        onChangeStage={stage => onChangeModLog('stage', { stage })}
      />
      <RateInput
        rank={rank}
        point={point}
        onChangeRate={(rank, point) => onChangeModLog('rate', { rank, point })}
      />
      <ResultInput
        result={result}
        onChangeResult={result => onChangeModLog('result', { result })}
      />
      <SingleBtn
        onClick={onClickModLog}
        disabled={canMod === false}
        text="これでシュウセイ"
        textProcessing="ショリチュウ..."
        textClicked="カンリョウ!"
      />
    </div>
  );
};

export default inject(
  'ui',
  'modLog',
  'event',
)(observer(ModLogForm));
