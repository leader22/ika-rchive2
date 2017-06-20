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
  <div className="others-page">
    <h2 className="app-name">ウデマエア-カイブ<b>2</b></h2>
    <p>
      バージョン: v{user.ver}
    </p>

    <h2>つかいかた</h2>
    <p>
      画面右上にある「<span className="ft-ika">キロクする</span>」から試合結果を記録すると、<span className="ft-ika">グラフ</span>や<span className="ft-ika">トウケイ</span>が見られるようになるぞ！
    </p>

    <h2>???</h2>
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
