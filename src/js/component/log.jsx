// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import NukaCarousel from 'nuka-carousel';

import Record from './log/record';

import type RecordStore from '../store/record';


const LogPage = ({
  record1, record2, record3,
  setting,
}: {
  record1: RecordStore,
  record2: RecordStore,
  record3: RecordStore,
  setting: Setting,
}) => (
<div>
  レコードのリスト表示と直近の修正
  <NukaCarousel
    decorators={[]}
    dragging={true}
    swiping={true}
  >
    { Object.entries(setting.MODE).map((kv, idx) => {
    let record;
    if (kv[0] === String(1)) { record = record1; }
    if (kv[0] === String(2)) { record = record2; }
    if (kv[0] === String(3)) { record = record3; }
    return (
    <div key={idx}>
      <div>{kv[1]}</div>
      <Record record={record} />
    </div>
    );
    }) }
  </NukaCarousel>
</div>
);

export default inject(
  'record1', 'record2', 'record3',
  'setting',
)(observer(LogPage));
