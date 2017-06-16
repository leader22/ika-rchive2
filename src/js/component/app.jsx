// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import GraphPage from './graph';
import LogPage from './log';
import StatPage from './stat';
import OthersPage from './others';
import AddLogModal from './add-log-modal';
import ModLogModal from './mod-log-modal';

import type Event from '../event';


class App extends React.Component {
  props: {
    event: Event,
  };

  render() {
    const { onClickOpenAddLogModal } = this.props.event;

    return (
      <div className="app">
        <header className="app-header">
          <div className="app-header__title">
            <img className="app-header__title__icon" src="./static/img/icon.png" alt="ウデマエアーカイブ2" />
          </div>
          <button
            type="button"
            className="app-header__action"
            onClick={onClickOpenAddLogModal}
          >
            <span className="ft-ika">キロクする</span>
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
        <AddLogModal />
        <ModLogModal />
      </div>
    );
  }
}

export default inject('event')(observer(App));
