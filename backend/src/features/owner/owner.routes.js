import express from "express";
import OwnerController from "./owner.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";

const ownerRouter = express.Router();
const ownerController = new OwnerController();

ownerRouter.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["owner"]),
  (req, res) => ownerController.getDashboard(req, res)
);

export default ownerRouter;