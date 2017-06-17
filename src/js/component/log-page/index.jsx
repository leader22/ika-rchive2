// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import NoItem from '../shared/no-item';
import Record from './record';

import type RecordStore from '../../store/record';


const LogPage = ({
  record,
}: {
  record: RecordStore
}) => {
  if (record.noItem) {
    return <NoItem />;
  }

  return (
    <div className="record-page">
      <Record />
    </div>
  );
};

export default inject(
  'record',
)(observer(LogPage));
