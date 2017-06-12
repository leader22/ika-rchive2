// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import setting from '../setting';
import WelcomeApp from './component/app';
import WelcomeEvent from './event';
import WelcomeStore from './store';


export default function(ver: string): void {
  const store = new WelcomeStore(ver);
  const event = new WelcomeEvent(store);

  ReactDOM.render(
    <Provider
      setting={setting}
      event={event}
    >
      <WelcomeApp />
    </Provider>,
    document.getElementById('jsWelcomeApp')
  );
}
