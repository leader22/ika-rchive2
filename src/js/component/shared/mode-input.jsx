// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';


const ModeInput = ({
  mode,
  onChangeMode,
  setting,
}: {
  mode: number,
  onChangeMode: (number) => void,
  setting: Setting,
}) => (
<div className="mode-input">
  { setting.MODE.map((v, idx) => (
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

export default inject(
  'setting',
)(observer(ModeInput));
