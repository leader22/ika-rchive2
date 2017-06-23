// @flow
import React from 'react';

import { WEAPON } from '../../setting';


const WeaponInput = ({
  weapon,
  onChangeWeapon,
}: {
  weapon: string,
  onChangeWeapon: (string) => void,
}) => (
<div className="weapon-input">
  <select
    name="weapon"
    onChange={ev => onChangeWeapon(ev.target.value)}
    value={weapon}
  >
    <option value="">ブキをキロクしない</option>
    { Object.entries(WEAPON).map(([key, v]) => (
    <option key={key} value={key}>{v}</option>
    )) }
  </select>
</div>
);

export default WeaponInput;
