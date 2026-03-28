import RatingsRepository from "./ratings.repository.js";

const ratingsRepository = new RatingsRepository();

class RatingsService {
  async addOrUpdateRating(user_id, store_id, rating) {
    const existing = await ratingsRepository.findRating(
      user_id,
      store_id
    );

    if (existing) {
      return await ratingsRepository.updateRating(
        user_id,
        store_id,
        rating
      );
    } else {
      return await ratingsRepository.createRating(
        user_id,
        store_id,
        rating
      );
    }
  }
}

export default new RatingsService();