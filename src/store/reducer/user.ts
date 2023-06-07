import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {authApi} from '../api/autApi';
import {UserState} from '../../utils';

const initialState: UserState = {
  isLogin: false,
  access_token: '',
  expires_in: 0,
  refresh_token: '',
  token_type: 'Bearer',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUserReset: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state = initialState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<UserState>) => {
        const {access_token, expires_in, refresh_token, token_type} =
          action.payload;
        state.token_type = token_type;
        state.access_token = access_token;
        state.expires_in = expires_in;
        state.refresh_token = refresh_token;
        state.isLogin = true;
      },
    );
  },
});

export const {setIsLogin, setUserReset} = userSlice.actions;

export default userSlice.reducer;
