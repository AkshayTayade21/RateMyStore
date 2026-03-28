import express from "express";
import StoresController from "./stores.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";

const storeRouter = express.Router();
const storesController = new StoresController();

storeRouter.get("/", authMiddleware, (req, res) => {
  storesController.getStores(req, res);
});

storeRouter.post('/',authMiddleware,roleMiddleware(["admin"]),(req, res) => {
    storesController.createStore(req, res);
})

export default storeRouter;