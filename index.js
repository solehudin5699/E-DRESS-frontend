/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
// import FilterModals from './src/screens/ModalFilter';
// import AppRoutes from './src/routes/AppRoutes';

import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import App from './src/App';

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Index);
