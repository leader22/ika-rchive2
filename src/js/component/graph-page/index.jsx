// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import NoItem from '../shared/no-item';
import RateGraph from './rate-graph';
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
      <RateGraph />
      <StageGraph />
    </div>
  );
};

export default inject(
  'record',
)(observer(GraphPage));
