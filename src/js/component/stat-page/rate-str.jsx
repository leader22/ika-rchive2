// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

function rateToRateStr(rate: number, rankTable): string {
  const point = rate % 100;
  const rank = (rate - point) / 100;
  const rankStr = rankTable[rank];
  return `${rankStr}${point}`;
}


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
