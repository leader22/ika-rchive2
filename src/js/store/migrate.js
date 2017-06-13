// @flow
import type { Record } from './record';
import type UserStore from './user';

export function migrateRecord(record: Record, prevVer: string, nextVer: string): Record {
  console.log('migrating record', prevVer, nextVer);
  return record;
}

export function migrateUser(user: UserStore, prevVer: string, nextVer: string): UserStore {
  console.log('migrating user', prevVer, nextVer);
  // user.ver = nextVer;

  return user;
}
