// @flow
import React from 'react';

type Props = {|
  text: string,
  textClicked?: string,
  onClick: () => void,
  disabled: boolean,
|};

class SingleBtn extends React.Component {
  _handleClick: () => void;

  state: {
    isClick: boolean,
  };
  props: Props;

  constructor(props: Props) {
    super(props);

    this.state = {
      isClick: false,
    };

    this._handleClick = () => {
      this.setState({ isClick: true });
      setTimeout(() => {
        this.setState({ isClick: false });
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
    const { isClick } = this.state;

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

export default SingleBtn;
