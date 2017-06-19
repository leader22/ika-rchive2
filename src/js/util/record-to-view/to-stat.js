// @flow
import { percentage } from '../../util';


export default {
  getEmptyObj(): Stat {
    return {
      totalPlayCount: 0,
      areaPlayCount: 0,
      yaguraPlayCount: 0,
      hokoPlayCount: 0,

      totalWinCount: 0,
      totalLoseCount: 0,
      areaWinCount: 0,
      areaLoseCount: 0,
      yaguraWinCount: 0,
      yaguraLoseCount: 0,
      hokoWinCount: 0,
      hokoLoseCount: 0,

      totalWinP: 0,
      areaWinP: 0,
      yaguraWinP: 0,
      hokoWinP: 0,

      areaBestRate: 0,
      yaguraBestRate: 0,
      hokoBestRate: 0,
      _areaTotalRate: 0,
      _yaguraTotalRate: 0,
      _hokoTotalRate: 0,
      areaAvgRate: 0,
      yaguraAvgRate: 0,
      hokoAvgRate: 0,

      areaByStage: {},
      yaguraByStage: {},
      hokoByStage: {},
    };
  },

  assignPlayCount(stat: Stat, item: Log): void {
    stat.totalPlayCount++;
    item.mode === 0 && stat.areaPlayCount++;
    item.mode === 1 && stat.yaguraPlayCount++;
    item.mode === 2 && stat.hokoPlayCount++;
  },

  assignWinCount(stat: Stat, item: Log): void {
    item.result && stat.totalWinCount++;
    (item.mode === 0 && item.result) && stat.areaWinCount++;
    (item.mode === 1 && item.result) && stat.yaguraWinCount++;
    (item.mode === 2 && item.result) && stat.hokoWinCount++;
  },

  assignBestRate(stat: Stat, item: Log): void {
    const rate = (item.rank * 100) + item.point;
    item.mode === 0 && (stat.areaBestRate = Math.max(stat.areaBestRate, rate));
    item.mode === 1 && (stat.yaguraBestRate = Math.max(stat.yaguraBestRate, rate));
    item.mode === 2 && (stat.hokoBestRate = Math.max(stat.hokoBestRate, rate));
    item.mode === 0 && (stat._areaTotalRate += rate);
    item.mode === 1 && (stat._yaguraTotalRate += rate);
    item.mode === 2 && (stat._hokoTotalRate += rate);
  },

  assignStagePlayAndWinCount(stat: Stat, item: Log): void {
    const { stage, mode, result } = item;
    stage in stat.areaByStage || (stat.areaByStage[stage] = __getByStage());
    stage in stat.yaguraByStage || (stat.yaguraByStage[stage] = __getByStage());
    stage in stat.hokoByStage || (stat.hokoByStage[stage] = __getByStage());
    mode === 0 && stat.areaByStage[stage].playCount++;
    mode === 1 && stat.yaguraByStage[stage].playCount++;
    mode === 2 && stat.hokoByStage[stage].playCount++;
    (mode === 0 && result) && stat.areaByStage[stage].winCount++;
    (mode === 1 && result) && stat.yaguraByStage[stage].winCount++;
    (mode === 2 && result) && stat.hokoByStage[stage].winCount++;
  },

  assignWinP(stat: Stat): void {
    stat.totalWinP = percentage(stat.totalWinCount, stat.totalPlayCount, 2);
    stat.areaWinP = percentage(stat.areaWinCount, stat.areaPlayCount, 2);
    stat.yaguraWinP = percentage(stat.yaguraWinCount, stat.yaguraPlayCount, 2);
    stat.hokoWinP = percentage(stat.hokoWinCount, stat.hokoPlayCount, 2);
  },

  assignLoseCount(stat: Stat): void {
    stat.totalLoseCount = stat.totalPlayCount - stat.totalWinCount;
    stat.areaLoseCount = stat.areaPlayCount - stat.areaWinCount;
    stat.yaguraLoseCount = stat.yaguraPlayCount - stat.yaguraWinCount;
    stat.hokoLoseCount = stat.hokoPlayCount - stat.hokoWinCount;
  },

  assignAvgRate(stat: Stat): void {
    stat.areaAvgRate = (stat._areaTotalRate / stat.areaPlayCount)|0;
    stat.yaguraAvgRate = (stat._yaguraTotalRate / stat.yaguraPlayCount)|0;
    stat.hokoAvgRate = (stat._hokoTotalRate / stat.hokoPlayCount)|0;
  },

  assignStageWinP(stat: Stat): void {
    for (let key in stat.areaByStage) {
      const val = stat.areaByStage[Number(key)];
      val.winP = percentage(val.winCount, val.playCount, 2);
    }
    for (let key in stat.yaguraByStage) {
      const val = stat.yaguraByStage[Number(key)];
      val.winP = percentage(val.winCount, val.playCount, 2);
    }
    for (let key in stat.hokoByStage) {
      const val = stat.hokoByStage[Number(key)];
      val.winP = percentage(val.winCount, val.playCount, 2);
    }
  },

  assignStageLoseCount(stat: Stat): void {
    for (let key in stat.areaByStage) {
      const val = stat.areaByStage[Number(key)];
      val.loseCount = val.playCount - val.winCount;
    }
    for (let key in stat.yaguraByStage) {
      const val = stat.yaguraByStage[Number(key)];
      val.loseCount = val.playCount - val.winCount;
    }
    for (let key in stat.hokoByStage) {
      const val = stat.hokoByStage[Number(key)];
      val.loseCount = val.playCount - val.winCount;
    }
  },
};


function __getByStage(): ByStage {
  return {
    playCount: 0,
    winCount: 0,
    loseCount: 0,
    winP: 0,
  };
}
