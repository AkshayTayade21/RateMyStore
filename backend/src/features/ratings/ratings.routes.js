import express from "express";
import RatingsController from "./ratings.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const ratingsRouter = express.Router();
const ratingsController = new RatingsController();

ratingsRouter.post("/", authMiddleware, (req, res) => {
  ratingsController.addRating(req, res);
});

export default ratingsRouter;