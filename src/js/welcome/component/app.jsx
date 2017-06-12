// @flow
import React from 'react';
import { inject } from 'mobx-react';

import RateInput from '../../shared/component/rate-input';
import type WelcomeEvent from '../event';


class WelcomeApp extends React.Component {
  props: {|
    event: WelcomeEvent,
  |};

  render() {
    const {
      onClickStart,
    } = this.props.event;

    return (
      <div>
        <RateInput />
        <div>から</div>
        <button
          type="button"
          onClick={onClickStart}
        >
          はじめる
        </button>
      </div>
    );
  }
}

export default inject(
  'event',
)(WelcomeApp);
