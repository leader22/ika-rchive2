// @flow
import React from 'react';

import { RANK } from '../../setting';

type Props = {|
  rank: number,
  point: number,
  onChangeRate: (number, number) => void,
|};

class RateInput extends React.Component {
  _onRankChange: (SyntheticInputEvent) => void;
  _onPointChange: (SyntheticInputEvent) => void;

  props: Props;

  constructor(props: Props) {
    super(props);

    this._onRankChange = (ev: SyntheticInputEvent) => {
      const rank = parseInt(ev.target.value);
      const point = this.props.point;
      if (typeof this.props.onChangeRate === 'function' && typeof point === 'number') {
        this.props.onChangeRate(rank, point);
      }
    };
    this._onPointChange = (ev: SyntheticInputEvent) => {
      const rank = this.props.rank;
      const point = parseInt(ev.target.value);
      if (typeof this.props.onChangeRate === 'function' && typeof rank === 'number') {
        this.props.onChangeRate(rank, point);
      }
    };
  }

  render() {
    const {
      rank, point,
    } = this.props;

    return (
      <div className="rate-input">
        <select
          name="rank"
          className="rate-input__rank"
          onChange={this._onRankChange}
          value={rank}
        >
          { RANK.map((v, idx) => (
          <option key={idx} value={idx}>{v}</option>
          )) }
        </select>
        <input
          className="rate-input__point"
          type="number"
          name="point"
          min={0} max={99}
          value={point}
          onChange={this._onPointChange}
        />
      </div>
    );
  }
}

export default RateInput;
