// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import NoItem from '../shared/no-item';
import RateGraph from './rate-graph';
import ModeGraph from './mode-graph';
import StageGraph from './stage-graph';

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
      <StageGraph />
      <ModeGraph />
      <RateGraph />
    </div>
  );
};

export default inject(
  'record',
)(observer(GraphPage));
