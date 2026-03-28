import express from "express";
import AdminController from "./admin.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";


const adminRouter = express.Router();
const adminController = new AdminController();

adminRouter.get("/dashboard",authMiddleware,roleMiddleware(["admin"]),(req, res) => {
    adminController.getDashboard(req, res);
  }
);

adminRouter.post("/users", authMiddleware,roleMiddleware(["admin"]),(req, res) => {
    adminController.createUser(req, res);
  }
);

adminRouter.get("/users",authMiddleware,roleMiddleware(["admin"]),(req, res) => {
    adminController.getUsers(req, res);
  }
);

adminRouter.get(
  "/stores",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    adminController.getStores(req, res);
  }
);

adminRouter.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    adminController.getUserDetails(req, res);
  }
);

export default adminRouter;