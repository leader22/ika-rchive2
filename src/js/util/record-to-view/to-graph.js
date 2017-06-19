// @flow
import { percentage } from '../../util';

export default {
  getEmptyObj(): Graph {
    return {
      _totalPlayCount: 0,
      _areaPlayCount: 0,
      _yaguraPlayCount: 0,
      _hokoPlayCount: 0,

      areaRate: [],
      yaguraRate: [],
      hokoRate: [],
      playModeRatio: [],
    };
  },

  assignRate(graph: Graph, item: Log): void {
    const rate = (item.rank * 100) + item.point;
    item.mode === 0 && graph.areaRate.push(rate);
    item.mode === 1 && graph.yaguraRate.push(rate);
    item.mode === 2 && graph.hokoRate.push(rate);
  },

  assignPlayCount(graph: Graph, item: Log): void {
    graph._totalPlayCount++;
    item.mode === 0 && graph._areaPlayCount++;
    item.mode === 1 && graph._yaguraPlayCount++;
    item.mode === 2 && graph._hokoPlayCount++;
  },

  assignPlayRatio(graph: Graph): void {
    graph.playModeRatio = [
      percentage(graph._areaPlayCount, graph._totalPlayCount, 2),
      percentage(graph._yaguraPlayCount, graph._totalPlayCount, 2),
      percentage(graph._hokoPlayCount, graph._totalPlayCount, 2),
    ];
  },
};
