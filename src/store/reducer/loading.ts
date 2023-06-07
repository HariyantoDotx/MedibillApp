import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface LoadingtState {
  visible: boolean;
}

const initialState: LoadingtState = {
  visible: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const {setLoading} = loadingSlice.actions;

export default loadingSlice.reducer;
