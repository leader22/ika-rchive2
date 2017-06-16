// @flow
import React from 'react';
import { observer } from 'mobx-react';

import {
  decodeTime,
  formatDate,
} from '../../../util';


const LogTime = ({
  time,
}: {
  time: number,
}) => (
  <span>{formatDate(decodeTime(time))}</span>
);

export default observer(LogTime);
