import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

// Import your reducers
import {authApi} from './api/autApi';
import userReducer from './reducer/user';
import profileReducer from './reducer/profile';
import allertReducer from './reducer/allert';
import loadingReducer from './reducer/loading';

import {apiRequest} from './api/apiRequest';

// Create a root reducer by combining your reducers
const rootReducer = combineReducers({
  users: userReducer,
  profile: profileReducer,
  allert: allertReducer,
  loading: loadingReducer,
  [authApi.reducerPath]: authApi.reducer,
  [apiRequest.reducerPath]: apiRequest.reducer,
});

// Configure Redux Persist
const persistConfig = {
  key: 'medibillApp',
  storage: AsyncStorage,
  whitelist: ['users', 'profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat([
      apiRequest.middleware,
      authApi.middleware,
    ]),
});

const persistor = persistStore(store);

export {API} from './api/config';
export {store, persistor};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './reducer/user';
export * from './reducer/profile';
export * from './api/apiRequest';
