import storesRepository from "./stores.repository.js";

class StoresService {
  async getStores(userId, filters) {
    return await storesRepository.getAllStoresWithRatings(userId, filters);
  }

  async createStore(storeData) {
    return await storesRepository.createStore(storeData);
  }

}

export default new StoresService();