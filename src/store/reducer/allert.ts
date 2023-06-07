import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AllertState {
  type?: string;
  message: string;
  visible: boolean;
}

const initialState: AllertState = {
  visible: false,
  type: 'error',
  message: '',
};

const allertSlice = createSlice({
  name: 'allert',
  initialState,
  reducers: {
    setAllert: (state, action: PayloadAction<AllertState>) => {
      (state.message = action.payload.message),
        (state.visible = action.payload.visible),
        (state.type = action.payload.type || 'error');
    },
    resetAlert: (state, action: PayloadAction<null>) => {
      state.message = initialState.message;
      state.visible = initialState.visible;
      state.type = initialState.type || 'error';
    },
  },
});

export const {setAllert, resetAlert} = allertSlice.actions;

export default allertSlice.reducer;
