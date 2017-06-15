// @flow
import React from 'react';


const SingleBtn = ({
  text,
  onClick,
  disabled,
}: {
  text: string,
  onClick: () => void,
  disabled: boolean,
}) => (
<button
  className="single-btn"
  type="button"
  {...{ onClick, disabled }}
>
  <span className="ft-ika">{text}</span>
</button>
);

export default SingleBtn;
