// @flow
import React from 'react';

import { RESULT } from '../../setting';


const ResultInput = ({
  result,
  onChangeResult,
}: {
  result: number,
  onChangeResult: (number) => void,
}) => (
<div className="result-input">
  { RESULT.map((v, idx) => (
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

export default ResultInput;
