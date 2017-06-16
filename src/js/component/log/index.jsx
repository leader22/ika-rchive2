// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import Record from './record';

import type RecordStore from '../../store/record';


const LogPage = ({
  record,
}: {
  record: RecordStore,
}) => (
<div>
  レコードのリスト表示
  <Record record={record} />
</div>
);

export default inject(
  'record',
)(observer(LogPage));
