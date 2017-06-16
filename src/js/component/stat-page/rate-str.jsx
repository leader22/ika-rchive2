// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import { rateToRateStr } from '../../util';


const RateStr = ({
  rate,
  setting,
}: {
  rate: number,
  setting: Setting,
}) => (
  <span>{rateToRateStr(rate, setting.RANK)}</span>
);

export default inject(
  'setting',
)(observer(RateStr));
