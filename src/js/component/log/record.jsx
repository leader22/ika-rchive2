// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type RecordStore from '../../store/record';
import type Event from '../../event';


const Record = ({
  record,
  event,
  setting,
}: {
  mode: number,
  record: RecordStore,
  event: Event,
  setting: Setting,
}) => (
<ul>
  { record.items.length === 0 && (
  <li>キロクなし</li>
  ) }
  { record.items.slice(0, 10).map((log, idx) => (
  <li key={`${log.id}-${idx}`}>
    <div>
      {log.id}
    </div>
    <div>
      {setting.STAGE[log.stage]}の
      {setting.MODE[log.mode]}で
      {setting.RESULT[log.result]}
    </div>
    <div>
      {setting.RANK[log.rank]}{log.point}
    </div>
    <div>
      <a onClick={() => { event.onClickModLog(log); }}>[修正]</a>
    </div>
    <hr />
  </li>
  )) }
</ul>
);

export default inject(
  'setting',
  'event',
)(observer(Record));
