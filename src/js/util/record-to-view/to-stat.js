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

      areaPlayP: 0,
      yaguraPlayP: 0,
      hokoPlayP: 0,

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
    item.md === 0 && stat.areaPlayCount++;
    item.md === 1 && stat.yaguraPlayCount++;
    item.md === 2 && stat.hokoPlayCount++;
  },

  assignWinCount(stat: Stat, item: Log): void {
    item.rs && stat.totalWinCount++;
    (item.md === 0 && item.rs) && stat.areaWinCount++;
    (item.md === 1 && item.rs) && stat.yaguraWinCount++;
    (item.md === 2 && item.rs) && stat.hokoWinCount++;
  },

  assignBestRate(stat: Stat, item: Log): void {
    const rate = (item.rk * 100) + item.pt;
    item.md === 0 && (stat.areaBestRate = Math.max(stat.areaBestRate, rate));
    item.md === 1 && (stat.yaguraBestRate = Math.max(stat.yaguraBestRate, rate));
    item.md === 2 && (stat.hokoBestRate = Math.max(stat.hokoBestRate, rate));
    item.md === 0 && (stat._areaTotalRate += rate);
    item.md === 1 && (stat._yaguraTotalRate += rate);
    item.md === 2 && (stat._hokoTotalRate += rate);
  },

  assignStagePlayAndWinCount(stat: Stat, item: Log): void {
    const { st, md, rs } = item;
    if (md === 0) {
      st in stat.areaByStage || (stat.areaByStage[st] = __getByStage());
      stat.areaByStage[st].playCount++;
      rs && stat.areaByStage[st].winCount++;
    }
    if (md === 1) {
      st in stat.yaguraByStage || (stat.yaguraByStage[st] = __getByStage());
      stat.yaguraByStage[st].playCount++;
      rs && stat.yaguraByStage[st].winCount++;
    }
    if (md === 2) {
      st in stat.hokoByStage || (stat.hokoByStage[st] = __getByStage());
      stat.hokoByStage[st].playCount++;
      rs && stat.hokoByStage[st].winCount++;
    }
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

  assignPlayP(stat: Stat): void {
    const {
      areaPlayCount,
      yaguraPlayCount,
      hokoPlayCount,
      totalPlayCount,
    } = stat;

    stat.areaPlayP = percentage(areaPlayCount, totalPlayCount, 1);
    stat.yaguraPlayP = percentage(yaguraPlayCount, totalPlayCount, 1);
    stat.hokoPlayP = percentage(hokoPlayCount, totalPlayCount, 1);
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
