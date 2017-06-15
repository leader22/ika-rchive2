// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

const RateStr = ({
  rate,
  setting,
}: {
  rate: number,
  setting: Setting,
}) => (
<span>{rateToRateStr(rate, setting.RANK)}</span>
);

export default inject('setting')(observer(RateStr));


function rateToRateStr(rate: number, rankTable): string {
  const point = rate % 100;
  const rank = rate - point;

  let label = '';
  for (let k in rankTable) {
    if (rank === rankTable[k]) {
      label = k;
      break;
    }
  }

  // 現時点で存在するウデマエのランクに収まってない場合
  if (label.length === 0) {
    return '';
  }

  return label + point;
}
