// import storage from 'redux-persist/es/storage';

import { cartActions } from "./types";

import RestaurantService from "../service/restaurant/restaurantService";

import {deDupeItems} from "../utils/array";

export const fetchCartItems = () => ({
    type: cartActions.FETCH_CART_ITEMS,
});

// export const updateCartItems = (data, qty) => ({
//     type: cartActions.UPDATE_CART_ITEM,
//     payload: {
//         ...data,
//         qty,
//     },
// });

export const updateCartItems = (data, qty) => {
    return (dispatch, getState) => {
        try {
            console.log('UPDATE_CART_ITEM')
            const currentCart = getState().cart.cartData;
            const payload  = { data, qty};
            const newCart = deDupeItems([...currentCart, ...[payload]]) || [];

            console.log("...currentCart", ...currentCart)
            console.log("...[payload]", ...[payload])

            console.log('newCart', newCart)
            console.log('currentCart', currentCart)
            console.log('data', data)

            dispatch({
                type: cartActions.SAVE_NEW_CART,
                payload: newCart
            })
        } catch (e) {
            console.log('erro al cargar item en el carrito ', e)
        }

    };
};


export const updateCartItemQty = (id, qty) => {
    return (dispatch, getState) => {
        try {
            const currentCart = getState().cart.cartData;
            console.log('UPDATE_CART_ITEM_QTY')
            console.log('id >>', id);
            console.log('qty >>', qty)

            const newCart = currentCart.map( o => {
                console.log('currentCart.map >> object >>>', o)
                if ( o.data.id === id ) {
                    const newO = o;
                    newO.qty = qty;
                    return newO
                }
                return o;
            })

            console.log('newCart >>', newCart)

            dispatch({
                type: cartActions.UPDATE_CART_ITEM_QTY,
                payload: newCart
            })
        } catch (e) {
            console.log('error al cambiar la cantidad del producto ', e)
        }
    }
};

export const deleteCartItem = id => {
    return (dispatch, getState) => {
        try {
            const currentCart = getState().cart.cartData;
            console.log('DELETE_ITEM');
            console.log('id >>', id);

            const newCart = currentCart.filter( o => o.data.id !== id)
            console.log('newCart', newCart);

            dispatch({
                type: cartActions.DELETE_CART_ITEM,
                payload: newCart
            })

        } catch (e) {
            console.log('error al eliminar producto ', e)
        }
    }
};

export const saveNewCart = data => ({
    type: cartActions.SAVE_NEW_CART,
    payload: data,
});


export const saveItemInfoToCart = data => ({
    type: cartActions.SAVE_ITEM_INFO,
    payload: data,
});

export const cleanCart = () => ({
    type: cartActions.CLEAN_CART_ITEMS,
});

