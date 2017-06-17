// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import NoItem from '../shared/no-item';
import StatTable from './table';

import type RecordStore from '../../store/record';


const StatPage = ({
  record,
}: {
  record: RecordStore
}) => {
  if (record.noItem) {
    return <NoItem />;
  }

  return (
    <div className="stat-page">
      <StatTable />
    </div>
  );
};

export default inject(
  'record',
)(observer(StatPage));
