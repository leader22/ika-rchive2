// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import { RANK } from '../../setting';

import type AddLogStore from '../../store/add-log';
import type RecordStore from '../../store/record';


const RecentLog = ({
  record,
  addLog,
}: {
  record: RecordStore,
  addLog: AddLogStore,
}) => {
  const { mode, lastRate } = addLog;

  const beginRankAndPoint = lastRate[mode] || [0, 0];
  const endRankAndPoint = record.lastRankAndPoint.get(mode) || [0, 0];

  return (
    <div className="recent-log">
      ウデマエ増減: {RANK[beginRankAndPoint[0]]}{beginRankAndPoint[1]} → {RANK[endRankAndPoint[0]]}{endRankAndPoint[1]}
    </div>
  );
};

export default inject(
  'addLog',
  'record',
)(observer(RecentLog));
