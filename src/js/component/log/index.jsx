// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import Record from './record';
import ModLogModal from './mod-log-modal';

import type RecordStore from '../../store/record';


const LogPage = ({
  record,
}: {
  record: RecordStore,
}) => (
<div>
  レコードのリスト表示
  <Record record={record} />
  <ModLogModal />
</div>
);

export default inject(
  'record',
)(observer(LogPage));
