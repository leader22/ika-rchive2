// @flow
import React from 'react';
import { observer } from 'mobx-react';


const CopyTextarea = ({
  text,
}: {
  text: string,
}) => (
  <textarea
    className="copy-text"
    value={text}
    readOnly
    onClick={(ev) => ev.currentTarget.setSelectionRange(0, 140)}
  ></textarea>
);

export default observer(CopyTextarea);
