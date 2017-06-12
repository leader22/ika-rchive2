// @flow
import React from 'react';
import ReactDOM from 'react-dom';

// import ArchiveApp from './component/app.jsx';
const ArchiveApp = () => <div>ArchiveApp!</div>;


export default function(): void {
  ReactDOM.render(
    <ArchiveApp />,
    document.getElementById('jsWelcomeApp')
  );
}
