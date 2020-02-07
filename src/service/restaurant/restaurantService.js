import restaurantConfig from "./restaurantConfig";

export default class RestaurantService {

  static fetchRestaurants() {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = restaurantConfig.fetchRestaurants;
        const response = await restaurantConfig.APIConnector.get(endpoint);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  static fetchMenuByRestaurant(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = restaurantConfig.fetchMenus.replace("id", id);
        const response = await restaurantConfig.APIConnector.get(endpoint);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}
