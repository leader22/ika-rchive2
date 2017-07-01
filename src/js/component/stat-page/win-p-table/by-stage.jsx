// @flow
import React from 'react';
import { observer } from 'mobx-react';

import { STAGE } from '../../../setting';


const ByStage = ({
  byStage,
}: {
  byStage: ByStage,
}) => (
  <table className="stat-table stat-table--fixed">
    <tbody>
      <tr>
        <td></td>
        <td>勝率</td>
        <td>内訳</td>
      </tr>
      { STAGE.map((stageName, idx) => {
        const stage = byStage[idx] || {};
        return (
          <tr key={idx}>
            <td className="elp">{stageName}</td>
            <td className="min">{stage.winP || 0}%</td>
            <td>{stage.playCount || 0}戦 {stage.winCount || 0}勝{stage.loseCount || 0}敗</td>
          </tr>
        );
    }) }
    </tbody>
  </table>
);

export default observer(ByStage);
