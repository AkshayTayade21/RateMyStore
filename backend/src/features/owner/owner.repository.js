import { pool } from "../../config/db.js";

export default class OwnerRepository {
  async getOwnerAverageRatings(ownerId) {
    const query = `
      SELECT 
        s.id AS store_id,
        s.name AS store_name,
        COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS average_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.owner_id = $1
      GROUP BY s.id, s.name
      ORDER BY s.name;
    `;

    const result = await pool.query(query, [ownerId]);
    return result.rows;
  }

  async getRatedUsers(ownerId) {
    const query = `
      SELECT DISTINCT
        u.id,
        u.name,
        u.email,
        u.address,
        u.role,
        r.rating,
        s.id AS store_id,
        s.name AS store_name
      FROM stores s
      JOIN ratings r ON r.store_id = s.id
      JOIN users u ON u.id = r.user_id
      WHERE s.owner_id = $1
      ORDER BY s.name, u.name;
    `;

    const result = await pool.query(query, [ownerId]);
    return result.rows;
  }
}