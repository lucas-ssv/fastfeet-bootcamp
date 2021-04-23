import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/reactotronConfig';

import { store, persistor } from './store/index';

import App from './App';

export default function Index() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
                <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
            </PersistGate>
        </Provider>
    );
}
