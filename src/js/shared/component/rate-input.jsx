// @flow
import React from 'react';
import { computed, extendObservable, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import type WelcomeEvent from '../../welcome/event';


class RateInput extends React.Component {
  _rank: number;
  _point: number;
  _rate: number;
  _onRankChange: (SyntheticInputEvent) => void;
  _onPointChange: (SyntheticInputEvent) => void;
  _disposer: () => mixed;

  props: {|
    rank?: number,
    point?: number,
    // FIXME: type
    setting: { RANK: { [string]: string } },
    event: WelcomeEvent,
  |};

  constructor(props) {
    super(props);

    extendObservable(this, {
      _rank: props.rank || 0,
      _point: props.point || 0,
      _rate: computed(() => {
        return this._rank + this._point;
      })
    });

    this._onRankChange = (ev: SyntheticInputEvent) => {
      this._rank = parseInt(ev.target.value);
    };
    this._onPointChange = (ev: SyntheticInputEvent) => {
      this._point = parseInt(ev.target.value);
    };
  }

  render() {
    const { setting } = this.props;

    return (
      <div>
        <select
          name="rank"
          onChange={this._onRankChange}
          value={this._rank}
        >
          { Object.entries(setting.RANK).map((rank, idx) => (
          <option key={idx} value={rank[1]}>{rank[0]}</option>
          )) }
        </select>
        <input
          type="number"
          name="point"
          min="0" max="99"
          value={this._point}
          onChange={this._onPointChange}
        />
      </div>
    );
  }

  componentDidMount() {
    this._disposer = reaction(
      () => this._rate,
      rate => this.props.event.onChangeRate(rate)
    );
  }

  componentWillUnmount() {
    this._disposer();
  }
}

export default inject(
  'setting',
  'event',
)(observer(RateInput));
