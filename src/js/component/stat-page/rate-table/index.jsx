// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import RateStr from './rate-str';

import type RecordStore from '../../../store/record';


const RateTable = ({
  record,
}: {
  record: RecordStore
}) => {
  const { stat } = record.view;

  return (
    <div>
      <h2>ウデマエ</h2>
      <table className="stat-table">
        <tbody>
          <tr>
            <td></td>
            <td>最高</td>
            <td>平均</td>
          </tr>
          <tr>
            <td>エリア</td>
            <td><RateStr rate={stat.areaBestRate} /></td>
            <td><RateStr rate={stat.areaAvgRate} /></td>
          </tr>
          <tr>
            <td>ヤグラ</td>
            <td><RateStr rate={stat.yaguraBestRate} /></td>
            <td><RateStr rate={stat.yaguraAvgRate} /></td>
          </tr>
          <tr>
            <td>ホコ</td>
            <td><RateStr rate={stat.hokoBestRate} /></td>
            <td><RateStr rate={stat.hokoAvgRate} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default inject(
  'record',
)(observer(RateTable));
