export function registerOrderRequest(data) {
    return {
        type: '@user/REGISTER_ORDER_REQUEST',
        payload: { data },
    };
}

export function registerOrderSuccess(data) {
    return {
        type: '@user/REGISTER_ORDER_SUCCESS',
        payload: { data },
    };
}

export function registerOrderFailure() {
    return {
        type: '@user/REGISTER_ORDER_FAILURE',
    };
}

export function updateOrderRequest(data, id) {
    return {
        type: '@user/UPDATE_ORDER_REQUEST',
        payload: { data, id },
    };
}

export function updateOrderSuccess(data, id) {
    return {
        type: '@user/UPDATE_ORDER_SUCCESS',
        payload: { data, id },
    };
}

export function updateOrderFailure() {
    return {
        type: '@user/UPDATE_ORDER_FAILURE',
    };
}

export function updateDelivererRequest(name, email, avatar_id, id) {
    return {
        type: '@user/UPDATE_DELIVERER_REQUEST',
        payload: { name, email, avatar_id, id },
    };
}

export function updateDelivererSuccess(name, email, avatar_id, id) {
    return {
        type: '@user/UPDATE_DELIVERER_SUCCESS',
        payload: { name, email, avatar_id, id },
    };
}

export function updateDelivererFailure() {
    return {
        type: '@user/UPDATE_DELIVERER_FAILURE',
    };
}

export function registerRecipientRequest(data) {
    return {
        type: '@user/REGISTER_RECIPIENT_REQUEST',
        payload: { data },
    };
}

export function registerRecipientSuccess(data) {
    return {
        type: '@user/REGISTER_RECIPIENT_SUCCESS',
        payload: { data },
    };
}

export function registerRecipientFailure() {
    return {
        type: '@user/REGISTER_RECIPIENT_FAILURE',
    };
}

export function updateRecipientRequest(data, id) {
    return {
        type: '@user/UPDATE_RECIPIENT_REQUEST',
        payload: { data, id },
    };
}

export function updateRecipientSuccess(data, id) {
    return {
        type: '@user/UPDATE_RECIPIENT_SUCCESS',
        payload: { data, id },
    };
}

export function updateRecipientFailure() {
    return {
        type: '@user/UPDATE_RECIPIENT_FAILURE',
    };
}

export function registerDelivererRequest(data) {
    return {
        type: '@user/REGISTER_DELIVERER_REQUEST',
        payload: { data },
    };
}

export function registerDelivererSuccess(data) {
    return {
        type: '@user/REGISTER_DELIVERER_SUCCESS',
        payload: { data },
    };
}

export function registerDelivererFailure() {
    return {
        type: '@user/REGISTER_DELIVERER_FAILURE',
    };
}

export function deleteOrderRequest(id) {
    return {
        type: '@user/DELETE_ORDER_REQUEST',
        payload: { id },
    };
}

export function deleteOrderSuccess(id) {
    return {
        type: '@user/DELETE_ORDER_SUCCESS',
        payload: { id },
    };
}

export function deleteOrderFailure() {
    return {
        type: '@user/DELETE_ORDER_SUCCESS',
    };
}

export function deleteDelivererRequest(id) {
    return {
        type: '@user/DELETE_DELIVERER_REQUEST',
        payload: { id },
    };
}

export function deleteDelivererSuccess(id) {
    return {
        type: '@user/DELETE_DELIVERER_SUCCESS',
        payload: { id },
    };
}

export function deleteDelivererFailure() {
    return {
        type: '@user/DELETE_DELIVERER_FAILURE',
    };
}

export function deleteRecipientRequest(id) {
    return {
        type: '@user/DELETE_RECIPIENT_REQUEST',
        payload: { id },
    };
}

export function deleteRecipientSuccess(id) {
    return {
        type: '@user/DELETE_RECIPIENT_SUCCESS',
        payload: { id },
    };
}

export function deleteRecipientFailure() {
    return {
        type: '@user/DELETE_RECIPIENT_FAILURE',
    };
}

export function cancelOrderRequest(id) {
    return {
        type: '@user/CANCEL_ORDER_REQUEST',
        payload: { id },
    };
}

export function cancelOrderFailure() {
    return {
        type: '@user/CANCEL_ORDER_FAILURE',
    };
}
