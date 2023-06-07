import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API} from './config';

interface LoginPayload {
  username: string;
  password: string;
  client_id: number;
  client_secret: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API.url}/api`,
    prepareHeaders: headers => headers.set('Accept', 'application/json'),
    timeout: 10000,
  }),
  tagTypes: ['AUTH'],
  endpoints: builder => ({
    login: builder.mutation<any, LoginPayload>({
      query: payload => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});
