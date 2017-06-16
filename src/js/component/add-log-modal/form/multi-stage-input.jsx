// @flow
import React from 'react';

import { STAGE } from '../../../setting';


const MultiStageInput = ({
  stageLane,
  stages,
  onChangeLane,
  onChangeStage,
}: {
  stageLane: number,
  stages: Array<number>,
  onChangeLane: (number) => void,
  onChangeStage: (number, number) => void,
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
        onChange={ev => onChangeLane(Number(ev.target.value))}
      />
      <select
        name={lane}
        onChange={ev => onChangeStage(lane, Number(ev.target.value))}
        value={stages[lane]}
      >
        { STAGE.map((v, idx) => (
        <option key={idx} value={idx}>{v}</option>
        )) }
      </select>
    </div>
    )) }
  </div>
);

export default MultiStageInput;
