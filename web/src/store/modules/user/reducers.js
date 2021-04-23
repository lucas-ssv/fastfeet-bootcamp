import produce from 'immer';

const INITIAL_STATE = {
    profile: null,
    order: [],
    deliverer: [],
    recipient: [],
};

export default function user(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.profile = null;
                break;
            }
            case '@user/REGISTER_ORDER_SUCCESS': {
                const { data } = action.payload;

                draft.order.push(data);
                break;
            }
            case '@user/UPDATE_ORDER_SUCCESS': {
                const { id, data } = action.payload;

                let orderExists = draft.order.find((order) => order.id === id);

                if (orderExists) {
                    orderExists = { ...data };
                }
                break;
            }
            case '@user/UPDATE_DELIVERER_SUCCESS': {
                const { name, email, avatar_id, id } = action.payload;

                let delivererExists = draft.deliverer.find(
                    (deliverer) => deliverer.id === id
                );

                if (delivererExists) {
                    delivererExists = {
                        name,
                        email,
                        avatar_id,
                    };
                }
                break;
            }
            case '@user/REGISTER_RECIPIENT_SUCCESS': {
                const { data } = action.payload;

                draft.recipient.push(data);
                break;
            }
            case '@user/UPDATE_RECIPIENT_SUCCESS': {
                const { data, id } = action.payload;

                let recipientExists = draft.recipient.find(
                    (recipient) => recipient.id === id
                );

                if (recipientExists) {
                    recipientExists = { ...data };
                }
                break;
            }
            case '@user/REGISTER_DELIVERER_SUCCESS': {
                const { data } = action.payload;

                draft.deliverer.push(data);

                break;
            }
            case '@user/DELETE_ORDER_SUCCESS': {
                const { id } = action.payload;

                const orderExists = draft.order.findIndex(
                    (order) => order.id === id
                );

                if (orderExists) {
                    draft.order.splice(orderExists, 1);
                }
                break;
            }
            case '@user/DELETE_DELIVERER_SUCCESS': {
                const { id } = action.payload;

                const delivererExists = draft.deliverer.findIndex(
                    (deliverer) => deliverer.id === id
                );

                if (delivererExists) {
                    draft.deliverer.splice(delivererExists, 1);
                }
                break;
            }
            case '@user/DELETE_RECIPIENT_SUCCESS': {
                const { id } = action.payload;

                const recipientExists = draft.recipient.findIndex(
                    (recipient) => recipient.id === id
                );

                if (recipientExists) {
                    draft.recipient.splice(recipientExists, 1);
                }
                break;
            }
            default:
        }
    });
}
