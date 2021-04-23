import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
    const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
        .configure({
            host: '10.0.2.2',
        })
        .use(reactotronRedux())
        .use(sagaPlugin())
        .useReactNative()
        .connect();

    tron.clear();

    console.tron = tron;
}
