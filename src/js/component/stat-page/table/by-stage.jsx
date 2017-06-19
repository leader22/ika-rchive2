// @flow
import React from 'react';
import { observer } from 'mobx-react';

import { STAGE } from '../../../setting';


const ByStage = ({
  byStage,
}: {
  byStage: ByStage,
}) => (
  <ul>
    { STAGE.map((stageName, idx) => {
      const stage = byStage[idx] || {};
      return (
        <li key={idx}>
          {stageName}: {stage.winP || 0}% = {stage.playCount || 0}戦/{stage.winCount || 0}勝/{stage.loseCount || 0}敗
        </li>
      );
    }) }
  </ul>
);

export default observer(ByStage);
