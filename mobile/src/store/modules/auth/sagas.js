import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
// import { toast } from 'react-toastify';

import api from '~/services/api';
// import history from '~/services/history';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { id } = payload;

        const response = yield call(api.get, `/deliverers/${id}`);

        const { deliverer, token } = response.data;

        // api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, deliverer));

        // history.push('/order');
    } catch (err) {
        // toast.error('Ocorreu um erro na autenticação, verifique seus dados');
        Alert.alert(
            'Erro na autenticação',
            'Ocorreu um erro na autenticação, verifique seus dados'
        );
        yield put(signInFailure());
    }
}

export function signOut() {
    // history.push('/');
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
