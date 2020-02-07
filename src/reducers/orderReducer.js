import {orderActions} from '../actions/types';

const initialState = {
    order: {
        table_number: 1,
        customer: { id: 1 },
        store: { id: 1 },
        order_details: [{
            menu_items: []
        }]
    },
    message: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case orderActions.CREATE_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case orderActions.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                message: "creacion de orden exitosa"
            };
        default:
            return state;
    }
}
