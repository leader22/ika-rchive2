// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import GraphPage from './graph';
import LogPage from './log';
import StatPage from './stat';
import OthersPage from './others';
import InputPage from './input';

import type Event from '../event';


class App extends React.Component {
  props: {
    event: Event,
  };

  render() {
    const { onClickOpenInputPage } = this.props.event;

    return (
      <div className="app">
        <header className="app-header">
          <div className="app-header__title">
            <img className="app-header__title__icon" src="./static/img/icon.png" alt="ウデマエアーカイブ2" />
          </div>
          <button className="app-header__action" onClick={onClickOpenInputPage}>
            <span className="ft-ika">キロク</span>
          </button>
        </header>
        <Tabs>
          <TabPanel>
            <GraphPage />
          </TabPanel>
          <TabPanel>
            <LogPage />
          </TabPanel>
          <TabPanel>
            <StatPage />
          </TabPanel>
          <TabPanel>
            <OthersPage />
          </TabPanel>
          <TabList>
            <Tab>
              <span className="ft-ika">グラフ</span>
            </Tab>
            <Tab>
              <span className="ft-ika">ログ</span>
            </Tab>
            <Tab>
              <span className="ft-ika">トウケイ</span>
            </Tab>
            <Tab>
              <span className="ft-ika">ソノタ</span>
            </Tab>
          </TabList>
        </Tabs>
        <InputPage />
      </div>
    );
  }
}

export default inject('event')(observer(App));
