import orderConfig from "./orderConfig";

export default class orderService {

    static createOrder(order) {
        return new Promise(async (resolve, reject) => {
            try {
                let body = JSON.stringify(order);

                const endpoint = orderConfig.createOrder;
                const response = await orderConfig.APIConnector.post(endpoint, {body: body});

                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    };
}
