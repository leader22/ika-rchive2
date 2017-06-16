// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type RecordStore from '../../store/record';


const GraphPage = ({
  record,
}: {
  record: RecordStore,
}) => (
<div>
  ウデマエの推移グラフと、キルレの推移グラフ
  <div>
    エリア: {record.areaItems.length}件
    ヤグラ: {record.yaguraItems.length}件
    ホコ: {record.hokoItems.length}件
  </div>
</div>
);

export default inject(
  'record',
)(observer(GraphPage));
