// @flow
import React from 'react';

import { RANK } from '../../setting';
import { rateToRateStr } from '../../util';


const RateStr = ({
  rate,
}: {
  rate: number,
}) => (
  <span>{rateToRateStr(rate, RANK)}</span>
);

export default RateStr;
