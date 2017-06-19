// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import GraphPage from './graph-page';
import LogPage from './log-page';
import StatPage from './stat-page';
import OthersPage from './others-page';
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
        <Tabs className="app-tabs">
          <TabPanel className="app-tabpanel">
            <GraphPage />
          </TabPanel>
          <TabPanel className="app-tabpanel">
            <StatPage />
          </TabPanel>
          <TabPanel className="app-tabpanel">
            <LogPage />
          </TabPanel>
          <TabPanel className="app-tabpanel">
            <OthersPage />
          </TabPanel>
          <TabList className="app-tablist">
            <Tab className="app-tab" selectedClassName="app-tab--selected">
              <span className="ft-ika">グラフ</span>
            </Tab>
            <Tab className="app-tab" selectedClassName="app-tab--selected">
              <span className="ft-ika">トウケイ</span>
            </Tab>
            <Tab className="app-tab" selectedClassName="app-tab--selected">
              <span className="ft-ika">ログ</span>
            </Tab>
            <Tab className="app-tab" selectedClassName="app-tab--selected">
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
