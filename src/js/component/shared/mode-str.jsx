// @flow
import React from 'react';

import { MODE, MODE_COLOR } from '../../setting';


const ModeStr = ({
  mode,
}: {
  mode: number,
}) => (
  <span style={{ color: MODE_COLOR[mode] }}>{MODE[mode]}</span>
);

export default ModeStr;
