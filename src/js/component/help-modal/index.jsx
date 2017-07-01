// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';

import Modal from '../shared/modal';

import type UiStore from '../../store/ui';
// import type UserStore from '../../store/user';
import type Event from '../../event';


const HelpModal = ({
  ui,
  // user,
  event,
}: {
  ui: UiStore,
  // user: UserStore,
  event: Event,
}) => (
  <Modal
    isOpen={ui.isHelpModalOpen}
    onClickClose={event.ui.onClickCloseHelpModal}
  >
    <div className="help">
      { /*
      <h2 className="service-name">ウデマエア-カイブ<b>2</b></h2>
      <p>
        バージョン: v{user.ver}
      </p>
      */ }

      <h2>ちゅうい</h2>
      <p>
        Splatoon2が実際に発売されるまで、機能改修を定期的に行います。場合によっては動かなくなったりすると思うので、その時は下にある「リセットしてはじめから」を。
        バグ・要望は<a href="https://twitter.com/leader22">@leader22</a>まで・・！
      </p>

      <h2>つかいかた</h2>
      <p>
        <span className="ft-ika">キロクする</span>からバトル結果をキロクだ！
      </p>
      <p>
        キロクすると、<span className="ft-ika">グラフ</span>や<span className="ft-ika">トウケイ</span>が見られるようになるぞ！
        ウデマエを上げるために、データを貯めて研究しよう！
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
  </Modal>
);

export default inject(
  'ui',
  'user',
  'event',
)(observer(HelpModal));
