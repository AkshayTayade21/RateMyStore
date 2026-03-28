import ratingsService from "./ratings.service.js";

export default class RatingsController {
  async addRating(req, res) {
    try {
      const user_id = req.user.id;
      const { store_id, rating } = req.body;

      const result = await ratingsService.addOrUpdateRating(
        user_id,
        store_id,
        rating
      );

      res.status(200).json({
        message: "Rating submitted",
        rating: result,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
}