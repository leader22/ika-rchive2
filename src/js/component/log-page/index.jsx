// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import Record from './record';


const LogPage = () => (
<div>
  レコードのリスト表示
  <Record />
</div>
);

export default inject()(observer(LogPage));
