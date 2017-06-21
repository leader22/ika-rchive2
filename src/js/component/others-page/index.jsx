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
    <h2 className="service-name">ウデマエア-カイブ<b>2</b></h2>
    <p>
      バージョン: v{user.ver}
    </p>

    <h2>ちゅうい</h2>
    <p>
      Splatoon2が実際に発売される7/21までは、機能改修を定期的に行います。場合によってはエラーで動かなくなったりすると思うので、その時は下にある「リセットしてはじめから」を使ってください。
    </p>
    <p>
      要望を<a href="https://twitter.com/leader22">@leader22</a>まで教えてもらえれば、もしかしたら実装されるかも・・？
    </p>

    <h2>つかいかた</h2>
    <p>
      画面右上にある「<span className="ft-ika">キロクする</span>」から試合結果を記録すると、<span className="ft-ika">グラフ</span>や<span className="ft-ika">トウケイ</span>が見られるようになるぞ！
    </p>

    <h2>デバッグツール</h2>
    <ul>
      <li>
        <a onClick={event.onClickResetAll}>リセットしてはじめから</a>
      </li>
      <li>
        <a onClick={event.onClickDebug1}>適当にエリアのキロクを作る</a>
      </li>
      <li>
        <a onClick={event.onClickDebug2}>適当にヤグラのキロクを作る</a>
      </li>
      <li>
        <a onClick={event.onClickDebug3}>適当にホコのキロクを作る</a>
      </li>
    </ul>
  </div>
);

export default inject(
  'user',
  'event',
)(observer(OthersPage));
