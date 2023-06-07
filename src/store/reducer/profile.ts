import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {apiRequest} from '../api/apiRequest';
import {GetProfileResponse, ProfileState} from '../../utils';

const initialState: ProfileState = {
  profileData: {
    code: '',
    created_at: '',
    email: '',
    email_verified_at: '',
    id: 0,
    level: '',
    name: '',
    parent_id: null,
    phone: '',
    supervisor_id: null,
    updated_at: '',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileReset: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.profileData = initialState.profileData;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiRequest.endpoints.getProfile.matchFulfilled,
      (state, action: PayloadAction<GetProfileResponse>) => {
        state.profileData = action.payload.data;
      },
    );
  },
});

export const {setProfileReset} = profileSlice.actions;

export default profileSlice.reducer;
