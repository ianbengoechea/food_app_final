import APIConnector from '../config/ApiConnector';
import Settings from '../config/Settings';

const apiConnector = new APIConnector({ timeout: 50000 });

export default class NoticiaConfig {

    // devuelve todos los stores
    static get fetchRestaurants() {
        return Settings.server + '/api/store';
    }
    // devuelve un store
    static get fetchRestaurant() {
        return Settings.server + '/api/store/?id=param';
    }
    // todo el menu de un store
    static get fetchMenus() {
        return Settings.server + '/api/stores/id/products';
    }

    static get APIConnector() {
        return apiConnector;
    }

}
