// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import NoItem from '../shared/no-item';
import RateGraph from './rate-graph';

import type RecordStore from '../../store/record';


const GraphPage = ({
  record,
}: {
  record: RecordStore,
}) => {
  if (record.noItem) {
    return <NoItem />;
  }

  return (
    <div className="graph-page">
      <RateGraph />
      <ul>
        <li>
          エリア: {record.areaItems.length}件
        </li>
        <li>
          ヤグラ: {record.yaguraItems.length}件
        </li>
        <li>
          ホコ: {record.hokoItems.length}件
        </li>
      </ul>
    </div>
  );
};

export default inject(
  'record',
)(observer(GraphPage));
