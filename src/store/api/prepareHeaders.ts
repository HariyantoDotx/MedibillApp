import { BaseQueryApi } from '@reduxjs/toolkit/dist/query';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { RootState } from '..';

type PickType = 'getState' | 'extra' | 'endpoint' | 'type' | 'forced';

export const prepareHeaders = (
  headers: Headers,
  {getState}: Pick<BaseQueryApi, PickType>,
): MaybePromise<void | Headers> => {
  const {users} = getState() as RootState;
  headers.set('Access-Control-Allow-Origin', '*');
  if (users.isLogin) {
    headers.set('Authorization', `Bearer ${users.access_token}`);
  }
  return headers;
};
