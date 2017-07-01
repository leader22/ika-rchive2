// @flow
import React from 'react';
import { observer } from 'mobx-react';

import { WEAPON } from '../../../setting';


const ByWeapon = ({
  byWeapon,
}: {
  byWeapon: ByWeapon,
}) => (
  <table className="stat-table stat-table--fixed">
    <tbody>
      <tr>
        <td className="elp"></td>
        <td className="min">回数</td>
      </tr>
      { Object.entries(byWeapon)
        .sort((a, b) => a[1].playCount < b[1].playCount)
        .map(([key, v]) => (
        <tr key={key}>
          <td className="elp">{WEAPON[key] || '未登録'}</td>
          <td className="min">{v.playCount}</td>
        </tr>
      )) }
      { Object.entries(byWeapon).length === 0 && (
        <tr>
          <td>まだキロクがありません</td>
          <td>-</td>
        </tr>
      ) }
    </tbody>
  </table>
);

export default observer(ByWeapon);
