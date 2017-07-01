// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import GraphPage from './graph-page';
import LogPage from './log-page';
import StatPage from './stat-page';
import SharePage from './share-page';
import AddLogModal from './add-log-modal';
import ModLogModal from './mod-log-modal';
import HelpModal from './help-modal';

import type UserStore from '../store/user';
import type Event from '../event';


const App = ({
  user,
  event,
}: {
  user: UserStore,
  event: Event,
}) => {
  const { visibleTab } = user;
  const {
    onClickOpenHelpModal,
    onClickOpenAddLogModal,
  } = event.ui;
  const {
    onChangeTab,
  } = event.user;

  return (
    <div>
      <header className="app-header">
        <button
          type="button"
          className="app-header__left"
          onClick={onClickOpenHelpModal}
        >
          <span className="ft-ika">ヘルプ</span>
        </button>
        <div className="app-header__title">
          <img className="app-header__title__icon" src="./static/img/icon.png" alt="ウデマエアーカイブ2" />
        </div>
        <button
          type="button"
          className="app-header__right"
          onClick={onClickOpenAddLogModal}
        >
          <span className="ft-ika">キロクする</span>
        </button>
      </header>
      <Tabs
        className="app-tabs"
        selectedIndex={visibleTab}
        onSelect={onChangeTab}
      >
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
          <SharePage />
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
            <span className="ft-ika">シェア</span>
          </Tab>
        </TabList>
      </Tabs>
      <HelpModal />
      <AddLogModal />
      <ModLogModal />
    </div>
  );
};

export default inject(
  'event',
  'user',
)(observer(App));
