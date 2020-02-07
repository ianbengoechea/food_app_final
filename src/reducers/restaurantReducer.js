import * as typeAction from '../actions/types';

const initialState = {
    fullList: [],
    restaurantDetail: {},
    restaurantMenuList: [],
    resutaurantMenu: {},
    restaurantType: null,
    RestaurantError: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case typeAction.RESTAURANT_FETCH_ALL:
            return {
                ...state,
                fullList: action.payload,
            };
        case typeAction.RESTAURANT_FETCH_BY_ID:
            return {
                ...state,
                restaurantDetail: action.payload,
            };
        case typeAction.RESTAURANT_FETCH_ALL_MENU:
            return {
                ...state,
                restaurantMenuList: action.payload,
            };
        case typeAction.RESTAURANT_FETCH_MENU:
            return {
                ...state,
                resutaurantMenu: action.payload,
            };
        default:
            return state;
    }
}
