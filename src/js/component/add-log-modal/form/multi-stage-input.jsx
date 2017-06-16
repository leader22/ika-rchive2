// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';


const MultiStageInput = ({
  stageLane,
  stages,
  onChangeLane,
  onChangeStage,
  setting,
}: {
  stageLane: number,
  stages: Array<number>,
  onChangeLane: (number) => void,
  onChangeStage: (number, number) => void,
  setting: Setting,
}) => (
  <div className="multi-stage-input">
    { [0, 1].map(lane => (
    <div key={lane} className="multi-stage-input__row">
      <input
        className="multi-stage-input__row__lane"
        type="radio"
        name="stageLane"
        value={lane}
        checked={stageLane === lane}
        onChange={onChangeLane}
      />
      <select
        name={lane}
        onChange={ev => onChangeStage(lane, ev.target.value)}
        value={stages[lane]}
      >
        { setting.STAGE.map((v, idx) => (
        <option key={idx} value={idx}>{v}</option>
        )) }
      </select>
    </div>
    )) }
  </div>
);

export default inject(
  'setting',
)(observer(MultiStageInput));
