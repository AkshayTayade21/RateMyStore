import storesService from "./stores.service.js";

export default class StoresController {

  async getStores(req, res) {
    try {
      const userId = req.user.id;
      const filters = req.query;

      const stores = await storesService.getStores(userId, filters);

      res.status(200).json({
        message: "Stores fetched successfully",
        stores,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async createStore(req, res) {
    try {
      const { name, email, address, owner_id } = req.body;

      const store = await storesService.createStore({
        name,
        email,
        address,
        owner_id,
      });

      res.status(201).json({
        message: "Store created successfully",
        store,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }

}