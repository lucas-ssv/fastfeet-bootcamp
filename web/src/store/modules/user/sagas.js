import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
    registerOrderSuccess,
    registerOrderFailure,
    registerRecipientSuccess,
    registerRecipientFailure,
    registerDelivererSuccess,
    registerDelivererFailure,
    updateOrderFailure,
    updateOrderSuccess,
    deleteOrderSuccess,
    deleteOrderFailure,
    cancelOrderFailure,
    updateDelivererFailure,
    updateDelivererSuccess,
    updateRecipientSuccess,
    updateRecipientFailure,
    deleteDelivererSuccess,
    deleteDelivererFailure,
    deleteRecipientSuccess,
    deleteRecipientFailure,
} from './actions';

export function* registerOrder({ payload }) {
    try {
        const { recipient_id, deliveryman_id, product } = payload.data;

        yield call(api.post, '/orders', {
            recipient_id,
            deliveryman_id,
            product,
        });

        toast.success('Encomenda criada com sucesso');

        yield put(registerOrderSuccess(payload.data));

        history.push('/order');
    } catch (err) {
        yield put(registerOrderFailure());

        toast.error('Falha ao criar encomenda');
    }
}

export function* updateOrder({ payload }) {
    try {
        const { id } = payload;
        const { recipient_id, deliveryman_id, product } = payload.data;

        yield call(api.put, `/orders/${id}`, {
            recipient_id,
            deliveryman_id,
            product,
        });

        toast.success('Encomenda atualizada com sucesso');

        yield put(updateOrderSuccess(payload.data, id));

        history.push('/order');
    } catch (err) {
        yield put(updateOrderFailure());

        toast.error('Falha ao atualizar encomenda');
    }
}

export function* registerRecipient({ payload }) {
    try {
        const {
            name,
            address,
            number,
            complement,
            city,
            state,
            zipcode,
        } = payload.data;

        yield call(api.post, '/recipients', {
            name,
            address,
            number,
            complement,
            city,
            state,
            zipcode,
        });

        toast.success('Destinat??rio cadastrado com sucesso');

        yield put(registerRecipientSuccess(payload.data));

        history.push('/recipient');
    } catch (err) {
        yield put(registerRecipientFailure());

        toast.error('Falha ao cadastrar destinat??rio');
    }
}

export function* updateRecipient({ payload }) {
    try {
        const { id } = payload;
        const {
            name,
            address,
            number,
            complement,
            state,
            city,
            zipcode,
        } = payload.data;

        yield call(api.put, `/recipients/${id}`, {
            name,
            address,
            number,
            complement,
            state,
            city,
            zipcode,
        });

        yield put(updateRecipientSuccess(payload.data, id));

        toast.success('Destinat??rio atualizado com sucesso');
    } catch (err) {
        toast.error('Falha ao atualizar destinat??rio');

        yield put(updateRecipientFailure());
    }
}

export function* registerDeliverer({ payload }) {
    try {
        const { name, email, avatar_id } = payload.data;

        yield call(api.post, '/deliverers', {
            name,
            email,
            avatar_id,
        });

        toast.success('Entregador cadastrado com sucesso');

        yield put(registerDelivererSuccess(payload.data));

        history.push('/deliverer');
    } catch (err) {
        yield put(registerDelivererFailure());

        toast.error('Falha ao cadastrar entregador');
    }
}

export function* updateDeliverer({ payload }) {
    try {
        const { id, name, email, avatar_id } = payload;

        yield call(api.put, `/deliverers/${id}`, {
            name,
            email,
            avatar_id,
        });

        toast.success('Entregador atualizado com sucesso');

        yield put(updateDelivererSuccess(name, email, avatar_id, id));

        history.push('/deliverer');
    } catch (err) {
        toast.error('Falha ao atualizar entregador');

        yield put(updateDelivererFailure());
    }
}

export function* deleteOrder({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `/orders/${id}`);

        toast.success('Encomenda excluida com sucesso');

        yield put(deleteOrderSuccess(id));
    } catch (err) {
        yield put(deleteOrderFailure());

        toast.error('Falha ao excluir encomenda');
    }
}

export function* deleteDeliverer({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `/deliverers/${id}`);

        toast.success('Entregador excluido com sucesso');

        yield put(deleteDelivererSuccess(id));

        history.push('/deliverer');
    } catch (err) {
        yield put(deleteDelivererFailure());

        toast.error('Falha ao excluir entregador');
    }
}

export function* deleteRecipient({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `/recipients/${id}`);

        toast.success('Destinat??rio excluido com sucesso');

        yield put(deleteRecipientSuccess(id));

        history.push('/recipient');
    } catch (err) {
        yield put(deleteRecipientFailure());

        toast.error('Falha ao excluir destinat??rio');
    }
}

export function* cancelOrder({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `/problem/${id}/cancel-delivery`);

        toast.success('Encomenda cancelada com sucesso');

        history.push('/order');
    } catch (err) {
        toast.error('Falha ao cancelar encomenda');

        yield put(cancelOrderFailure());
    }
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
    takeLatest('@user/REGISTER_ORDER_REQUEST', registerOrder),
    takeLatest('@user/UPDATE_ORDER_REQUEST', updateOrder),
    takeLatest('@user/UPDATE_DELIVERER_REQUEST', updateDeliverer),
    takeLatest('@user/UPDATE_RECIPIENT_REQUEST', updateRecipient),
    takeLatest('@user/REGISTER_RECIPIENT_REQUEST', registerRecipient),
    takeLatest('@user/REGISTER_DELIVERER_REQUEST', registerDeliverer),
    takeLatest('@user/DELETE_ORDER_REQUEST', deleteOrder),
    takeLatest('@user/DELETE_DELIVERER_REQUEST', deleteDeliverer),
    takeLatest('@user/DELETE_RECIPIENT_REQUEST', deleteRecipient),
    takeLatest('@user/CANCEL_ORDER_REQUEST', cancelOrder),
]);
