import APIConnector from '../config/ApiConnector';
import Settings from '../config/Settings';

const apiConnector = new APIConnector({ timeout: 50000 });

export default class orderConfig {

    static get createOrder() {
        return Settings.server + '/api/order';
    }

    static get APIConnector() {
        return apiConnector;
    }

}
