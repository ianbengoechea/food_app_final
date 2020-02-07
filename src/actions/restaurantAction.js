import * as actionType from './types';
import RestaurantService from "../service/restaurant/restaurantService";

export const fetchRestaurant = callback => {
    return dispatch => {
        RestaurantService.fetchRestaurants()
            .then(response => {

                dispatch({
                    type: actionType.RESTAURANT_FETCH_ALL,
                    payload: response,
                });

                if (callback) callback(response);
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const fetchDishesByRestaurant = (id) => {
    return dispatch => {
        RestaurantService.fetchMenuByRestaurant(id)
            .then(response => {

                dispatch({
                    type: actionType.RESTAURANT_FETCH_ALL_MENU,
                    payload: response,
                });

                if (callback) callback(response);
            })
            .catch(err => {
                console.log(err);
            });
    };
};
