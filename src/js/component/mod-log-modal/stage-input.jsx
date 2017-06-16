// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';


const StageInput = ({
  stage,
  onChangeStage,
  setting,
}: {
  stage: number,
  onChangeStage: (number) => void,
  setting: Setting,
}) => (
<div className="stage-input">
  <select
    name="stage"
    onChange={ev => onChangeStage(parseInt(ev.target.value))}
    value={stage}
  >
    { setting.STAGE.map((v, idx) => (
    <option key={idx} value={idx}>{v}</option>
    )) }
  </select>
</div>
);

export default inject(
  'setting',
)(observer(StageInput));
