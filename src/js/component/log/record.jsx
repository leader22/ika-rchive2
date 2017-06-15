// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import RateStr from '../shared/rate-str';

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
      {setting.STAGE[String(log.stage)]}で{setting.RESULT[String(log.result)]}！
    </div>
    <div>
      <RateStr rate={log.rate} />
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
