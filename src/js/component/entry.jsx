// @flow
import React from 'react';
import { computed, extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';

import RateInput from './shared/rate-input';


class Entry extends React.Component {
  _rank: number;
  _point: number;
  _canAdd: boolean;
  _onChangeRate: (Rate) => void;
  _onClickEntry: () => void;

  props: {
    setting: Setting,
    onClickEntry: (number) => void;
  };

  constructor() {
    super();

    extendObservable(this, {
      _rank: 0,
      _point: 0,
      _canAdd: computed(() => {
        if (isNaN(this._point)) { return false; }
        return true;
      }),
    });

    this._onChangeRate = ({ rank, point }) => {
      this._rank = rank;
      this._point = point;
    };
    this._onClickEntry = () => {
      this.props.onClickEntry(this._rank + this._point);
    };
  }

  render() {
    return (
      <div className="entry">
        <RateInput
          onChangeRate={this._onChangeRate}
        />
        <div>
          から
        </div>
        <button
          className="add-button"
          type="button"
          onClick={this._onClickEntry}
          disabled={this._canAdd === false}
        >
          <span className="ft-ika">はじめる</span>
        </button>
      </div>
    );
  }
}

export default inject(
  'setting',
)(observer(Entry));
