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
  { setting.RESULT.map((v, idx) => (
  <label className="result-input__item" key={idx}>
    <input
      name="result"
      type="radio"
      value={idx}
      checked={idx === result}
      onChange={() => {
        onChangeResult(idx);
      }}
    />{v}
  </label>
  ))}
</div>
);

export default inject('setting')(observer(ResultInput));
