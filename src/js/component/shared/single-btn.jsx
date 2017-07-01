// @flow
import React from 'react';


type Props = {|
  text: string,
  textClicked: string,
  textProcessing: string,
  onClick: () => Promise<*>,
  disabled: boolean,
|};

class SingleBtn extends React.Component {
  _handleClick: () => void;

  state: {
    status: number,
  };
  props: Props;
  static btnState: { [string]: number };

  constructor(props: Props) {
    super(props);

    this.state = {
      status: SingleBtn.btnState.READY,
    };

    this._handleClick = () => {
      this.setState({ status: SingleBtn.btnState.PROCESSING });

      requestAnimationFrame(() => {
        Promise.resolve(this.props.onClick())
          .then(() => {
            this.setState({ status: SingleBtn.btnState.COMPLETE });
          })
          .then(() => {
            setTimeout(() => {
              this.setState({ status: SingleBtn.btnState.READY });
            }, 500);
          });
      });
    };
  }

  render() {
    const {
      text,
      textClicked,
      textProcessing,
      disabled,
    } = this.props;
    const { status } = this.state;

    if (status === SingleBtn.btnState.COMPLETE) {
      return (
        <button
          className="single-btn single-btn--clicked"
          type="button"
          disabled={disabled}
        >
          <span className="ft-ika">{textClicked}</span>
        </button>
      );
    }

    if (status === SingleBtn.btnState.PROCESSING) {
      return (
        <button
          className="single-btn"
          type="button"
          disabled={true}
        >
          <span className="ft-ika">{textProcessing}</span>
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

SingleBtn.btnState = {
  READY: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

export default SingleBtn;
