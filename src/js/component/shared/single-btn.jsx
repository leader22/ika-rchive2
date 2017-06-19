// @flow
import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

type Props = {|
  text: string,
  textClicked?: string,
  onClick: () => void,
  disabled: boolean,
|};

class SingleBtn extends React.Component {
  _handleClick: () => void;
  _vm: {
    isClick: boolean,
  };

  props: Props;

  constructor(props: Props) {
    super(props);

    this._vm = observable({
      isClick: false,
    });

    this._handleClick = () => {
      this._vm.isClick = true;
      setTimeout(() => {
        this._vm.isClick = false;
        this.props.onClick();
      }, 500);
    };
  }

  render() {
    const {
      text,
      textClicked,
      disabled,
    } = this.props;
    const { isClick } = this._vm;

    if (isClick) {
      return (
        <button
          className="single-btn single-btn--clicked"
          type="button"
          disabled={disabled}
        >
          <span className="ft-ika">{textClicked || text}</span>
        </button>
      );
    }

    return (
      <button
        className="single-btn"
        type="button"
        disabled={disabled}
        onClick={this._handleClick}
      >
        <span className="ft-ika">{text}</span>
      </button>
    );
  }
}

export default observer(SingleBtn);
