// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import type UserStore from '../../store/user';
import type Event from '../../event';


const OthersPage = ({
  user,
  event,
}: {
  user: UserStore,
  event: Event,
}) => (
<div>
  <h3 className="app-name">ウデマエア-カイブ<b>2</b></h3>
  <ul>
    <li>
      バージョン: v{user.ver}
    </li>
  </ul>

  <h3>つかいかた</h3>
  <ul>
    <li>
      画面右上にある「キロクする」から・・
    </li>
  </ul>

  <h3>???</h3>
  <ul>
    <li>
      <a onClick={event.onClickResetAll}>リセットしてはじめから</a>
    </li>
  </ul>
</div>
);

export default inject(
  'user',
  'event',
)(observer(OthersPage));
