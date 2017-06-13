// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type RecordStore from '../store/record';


const GraphPage = ({
  record1, record2, record3,
}: {
  record1: RecordStore,
  record2: RecordStore,
  record3: RecordStore,
}) => (
<div>
  ウデマエの推移グラフと、キルレの推移グラフ
  <div>
    エリア: {record1.items.length}件
    ヤグラ: {record2.items.length}件
    ホコ: {record3.items.length}件
  </div>
</div>
);

export default inject(
  'record1', 'record2', 'record3',
)(observer(GraphPage));
