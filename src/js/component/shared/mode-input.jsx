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
  { Object.entries(setting.MODE).map((kv, idx) => (
  <label className="mode-input__item" key={idx}>
    <input
      name="mode"
      type="radio"
      value={kv[0]}
      checked={kv[0] === String(mode)}
      onChange={(ev: SyntheticInputEvent) => {
        onChangeMode(parseInt(ev.target.value));
      }}
    />{kv[1]}
  </label>
  ))}
</div>
);

export default inject('setting')(observer(ModeInput));
