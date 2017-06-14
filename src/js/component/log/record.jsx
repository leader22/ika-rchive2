// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type RecordStore from '../../store/record';


const Record = ({
  record,
  setting,
}: {
  record: RecordStore,
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
      {log.rate}
    </div>
    <hr />
  </li>
  )) }
</ul>
);

export default inject('setting')(observer(Record));
