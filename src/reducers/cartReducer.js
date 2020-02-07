import {cartActions} from '../actions/types';

const initialState = {
    cartData: [],
    inProgress: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case cartActions.SAVE_NEW_CART:
            return {
                ...state,
                cartData: action.payload
            };
        case cartActions.UPDATE_CART_ITEM:
            return {
                ...state,
                cartData: action.payload
            };
        case cartActions.UPDATE_CART_ITEM_QTY:
            return {
                ...state,
                cartData: action.payload
            };
        case cartActions.FETCH_CART_ITEMS:
            return {
                ...state,
                cartData: action.payload,
            };
        case cartActions.DELETE_CART_ITEM:
            return {
                ...state,
                cartData: action.payload,
            };
        default:
            return state;
    }
}
