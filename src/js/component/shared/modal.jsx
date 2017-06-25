// @flow
import React from 'react';


const Modal = ({
  isOpen,
  onClickClose,
  children,
}: {
  isOpen: boolean,
  onClickClose: () => void,
  children: React$Element<*>,
}) => (
  <div className={`app-modal ${isOpen ? 'app-modal--opened' : ''}`}>
    <header className="app-header">
      <button
        className="app-header__right"
        type="button"
        onClick={onClickClose}
      >
        <span className="ft-ika">キャンセル</span>
      </button>
    </header>
    {children}
  </div>
);

export default Modal;
