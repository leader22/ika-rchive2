// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';


const ResultInput = ({
  result,
  onChangeResult,
  setting,
}: {
  result: number,
  onChangeResult: (number) => void,
  setting: Setting,
}) => (
<div className="result-input">
  { Object.entries(setting.RESULT).map((kv, idx) => (
  <label className="result-input__item" key={idx}>
    <input
      name="result"
      type="radio"
      value={kv[0]}
      checked={kv[0] === String(result)}
      onChange={(ev: SyntheticInputEvent) => {
        onChangeResult(parseInt(ev.target.value));
      }}
    />{kv[1]}
  </label>
  ))}
</div>
);

export default inject('setting')(observer(ResultInput));
