import { orderActions } from './types';
import orderService from "../service/order/orderService";

export const createOrder = (order, callback) => {
    return (dispatch, getState) => {
        try {
            console.log('CREATE_ORDER >> order >> ', order)
            dispatch({
                type: orderActions.CREATE_ORDER,
                payload: order
            })

            const actualOrder = {
                    table_number: 1,
                    customer: { id: 1 },
                    store: { id: 1 },
                    order_details: [{
                        menu_items: order
                    }]
                };


            orderService.createOrder(actualOrder)
                .then(resp => {
                    dispatch({ type: orderActions.CREATE_ORDER_SUCCESS})
                    if (callback) callback(resp)
                })
                .catch( err => {
                    console.log('error en la creacion de la orden', err)
                })

        } catch (e) {
            console.log('error al crear orden', e)
        }
    };
};
