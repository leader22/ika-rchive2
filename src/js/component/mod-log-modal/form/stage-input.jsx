// @flow
import React from 'react';

import { STAGE } from '../../../setting';


const StageInput = ({
  stage,
  onChangeStage,
}: {
  stage: number,
  onChangeStage: (number) => void,
}) => (
<div className="stage-input">
  <select
    name="stage"
    onChange={ev => onChangeStage(parseInt(ev.target.value))}
    value={stage}
  >
    { STAGE.map((v, idx) => (
    <option key={idx} value={idx}>{v}</option>
    )) }
  </select>
</div>
);

export default StageInput;
