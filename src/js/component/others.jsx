// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type UserStore from '../store/user';
import type Event from '../event';


const OthersPage = ({
  user,
  event,
}: {
  user: UserStore,
  event: Event,
}) => (
<div>
  その他、設定やバージョン情報やら
  <div>
    バージョン: v{user.ver}
  </div>

  <button
    type="button"
    onClick={event.onClickResetAll}
  >リセットする</button>
</div>
);

export default inject(
  'user',
  'event',
)(observer(OthersPage));
