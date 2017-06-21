// @flow
import React from 'react';

import { MODE } from '../../setting';


const ModeInput = ({
  mode,
  onChangeMode,
}: {
  mode: number,
  onChangeMode: (number) => void,
}) => (
<div className="mode-input">
  { MODE.map((v, idx) => (
  <label
    key={idx}
    className={`mode-input__item ${idx === mode ? 'mode-input__item--checked' : ''}`}
  >
    <input
      name="mode"
      type="radio"
      value={idx}
      checked={idx === mode}
      onChange={() => {
        onChangeMode(idx);
      }}
    />{v}
  </label>
  ))}
</div>
);

export default ModeInput;
