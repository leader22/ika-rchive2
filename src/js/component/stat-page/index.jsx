// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import NoItem from '../shared/no-item';
import RateTable from './rate-table';
import PlayTable from './play-table';
import WinPTable from './win-p-table';
import WeaponTable from './weapon-table';

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
      <RateTable />
      <PlayTable />
      <WinPTable />
      <WeaponTable />
    </div>
  );
};

export default inject(
  'record',
)(observer(StatPage));
