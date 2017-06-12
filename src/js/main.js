// @flow
import bootWelcome from './welcome';
import bootArchive from './archive';

// eslint-disable-next-line
const ver = __VERSION__;


// 環境チェック第一
try {
  localStorage.setItem('IA2_TEST', 'TEST');
  localStorage.removeItem('IA2_TEST');
} catch(err) {
  // TODO:
  location.href = './sorry.html';
}

const data = localStorage.getItem('IA2');

// はじめての方
if (data === null) {
  bootWelcome(ver);
}
else {
  // ver
  // data
  bootArchive();
}
