// @flow

export default {
  getEmptyObj(): Graph {
    return {
      areaRate: [],
      yaguraRate: [],
      hokoRate: [],
    };
  },

  assignRate(graph: Graph, item: Log): void {
    const rate = (item.rank * 100) + item.point;
    item.mode === 0 && graph.areaRate.push(rate);
    item.mode === 1 && graph.yaguraRate.push(rate);
    item.mode === 2 && graph.hokoRate.push(rate);
  },
};
