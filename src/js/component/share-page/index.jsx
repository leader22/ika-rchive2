// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import NoItem from '../shared/no-item';
import ShareText from './share-text';

import type RecordStore from '../../store/record';


const SharePage = ({
  record,
}: {
  record: RecordStore,
}) => {
  if (record.noItem) {
    return <NoItem />;
  }

  return (
    <div className="share-page">
      <ShareText />
    </div>
  );
};

export default inject(
  'record',
)(observer(SharePage));
