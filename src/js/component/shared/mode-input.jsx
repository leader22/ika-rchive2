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
  <label className="mode-input__item" key={idx}>
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
