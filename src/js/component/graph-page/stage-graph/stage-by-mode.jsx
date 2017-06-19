// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';

import NoItem from '../../shared/no-item';
import { STAGE } from '../../../setting';

import type RecordStore from '../../../store/record';


function getChartConfig() {
  return {
    title: { text: null, },
    credits: { enabled: false, },
    legend: { enabled: false, },
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: window.innerHeight * 0.4,
      spacing: [10, 0, 10, 0],
    },
    xAxis: {
      categories: [],
      labels: {
        style: { color: '#fff', },
      },
    },
    yAxis: [
      {
        title: { text: null, },
        labels: {
          style: { color: '#fff', },
        },
      },
      {
        title: { text: null, },
        opposite: true,
        labels: {
          style: { color: '#fff', },
        },
      },
    ],
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    tooltip: {
      shared: true,
      backgroundColor: '#000',
      style: { color: '#fff', },
    },
    series: [],
  };
}

const StageByMode = ({
  mode,
  record,
}: {
  mode: number,
  record: RecordStore,
}) => {
  const playCountSeries = {
    data: [],
    color: '#fff',
  };
  const winPSeries = {
    yAxis: 1,
    data: [],
  };

  let byStage = {};
  if (mode === 0) {
    byStage = record.view.graph.areaByStage;
  }
  if (mode === 1) {
    byStage = record.view.graph.yaguraByStage;
  }
  if (mode === 2) {
    byStage = record.view.graph.hokoByStage;
  }

  const stages = [];
  // いちおう全ステージで回るけど、使うかは別
  STAGE.forEach((stageName, idx) => {
    const stage = byStage[idx];
    // 遊んだところだけ出す
    if (stage && stage.playCount) {
      stages.push(stageName);
      playCountSeries.data.push(stage.playCount);
      winPSeries.data.push(stage.winP);
    }
  });

  if (stages.length === 0) {
    return <NoItem />;
  }

  const config = getChartConfig();
  config.xAxis.categories = stages;
  config.series.push(playCountSeries, winPSeries);
  return (
    <ReactHighcharts config={config} />
  );
};

export default inject(
  'record',
)(observer(StageByMode));
