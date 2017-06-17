// @flow
import React from 'react';


const LogModal = ({
  isOpen,
  onClickClose,
  children,
}: {
  isOpen: boolean,
  onClickClose: () => void,
  children: React$Element<*>,
}) => (
  <div className={`log-modal ${isOpen ? 'log-modal--opened' : ''}`}>
    <header className="app-header">
      <button
        className="app-header__action"
        type="button"
        onClick={onClickClose}
      >
        <span className="ft-ika">キャンセル</span>
      </button>
    </header>
    {children}
  </div>
);

export default LogModal;
