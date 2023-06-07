import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Loading, PopupMessage} from './components';
import Router from './router';
import {persistor, store, useAppSelector} from './store';

const MainApp = () => {
  const allertMessage = useAppSelector(state => state.allert);
  const loading = useAppSelector(state => state.loading.visible);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <PopupMessage {...allertMessage} />
      <Loading loading={loading} />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
