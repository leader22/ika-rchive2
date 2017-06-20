// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import { MODE, MODE_COLOR } from '../../setting';

import type RecordStore from '../../store/record';


const ModeGraph = ({
  record,
}: {
  record: RecordStore,
}) => {
  return (
    <div>
      <h2>ルールのプレイわりあい</h2>
      <div className="mode-graph">
        { record.view.graph.playModeRatio.map((ratio, idx) => (
        <div
          key={idx}
          style={{ width: `${ratio}%`, backgroundColor: MODE_COLOR[idx] }}
          className="mode-graph__item"
        >
        </div>
        )) }
      </div>
      <div className="mode-graph-legend">
        { record.view.graph.playModeRatio.map((ratio, idx) => (
        <span key={idx}>
          { idx === 0 || ' / ' }
          {MODE[idx]}: {ratio}%
        </span>
        )) }
      </div>
    </div>
  );
};

export default inject(
  'record',
)(observer(ModeGraph));
