// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
// import { chart } from 'highcharts';
import ReactHighcharts from 'react-highcharts';

import { rateToRateStr } from '../../util';
import { RANK } from '../../setting';

import type RecordStore from '../../store/record';


const RateGraph = ({
  record,
}: {
  record: RecordStore,
}) => {
  // TODO: 計算はstoreで
  const data = record.areaItems.map(log => {
    return (log.rank * 100) + log.point;
  });
  const height = window.innerHeight * 0.4;

  const config = {
    title: { text: null, },
    credits: { enabled: false, },
    legend: { enabled: false, },
    chart: {
      backgroundColor: 'transparent',
      zoomType: 'x',
      height,
    },
    xAxis: {
      // 拡大時の最小単位を1"件"に固定したい（0.5試合目とかないから）
      allowDecimals: false,
      labels: {
        style: { color: '#fff', },
      },
    },
    yAxis: {
      title: { text: null, },
      labels: {
        formatter: function() {
          return rateToRateStr(this.value, RANK);
        },
        style: { color: '#fff', },
      },
      allowDecimals: false,
    },
    plotOptions: {
      area: {
        // ズーム時にyAxisを調整
        threshold: null,
      }
    },
    tooltip: {
      backgroundColor: '#000',
      style: { color: '#fff', },
      formatter: function() {
        return rateToRateStr(this.y, RANK);
      },
    },
    series: [{
      type: 'area',
      color: '#ff6e00',
      // idxではなく1から
      pointStart: 1,
      data: data,
    }]
  };

  return (
    <div>
      <h3>ウデマエのスイイ</h3>
      <ReactHighcharts config={config} />
    </div>
  );
};

export default inject(
  'record',
)(observer(RateGraph));
