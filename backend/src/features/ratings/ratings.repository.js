import { pool } from "../../config/db.js";

export default class RatingsRepository {
  async findRating(user_id, store_id) {
    const query =
      "SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2";
    const result = await pool.query(query, [user_id, store_id]);
    return result.rows[0];
  }

  async createRating(user_id, store_id, rating) {
    const query = `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [user_id, store_id, rating]);
    return result.rows[0];
  }

  async updateRating(user_id, store_id, rating) {
    const query = `
      UPDATE ratings
      SET rating = $1
      WHERE user_id = $2 AND store_id = $3
      RETURNING *;
    `;
    const result = await pool.query(query, [
      rating,
      user_id,
      store_id,
    ]);
    return result.rows[0];
  }
}