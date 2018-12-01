// @flow
import {db, toCamelCase} from 'distraught';

type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
};

export function fetchUsers(): Promise<Array<User>> {
  return db.ck('users')
    .limit(10)
    .then(toCamelCase);
}

export function nameIsJason(firstName: string): boolean {
  return firstName === 'Jason';
}
