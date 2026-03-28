import { pool } from "../../config/db.js";

 class StoresRepository {
 async getAllStoresWithRatings(userId, filters = {}) {
  const values = [userId];

  let query = `
    SELECT 
      s.id,
      s.name,
      s.email,
      s.address,
      COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS overall_rating,
      (
        SELECT rating
        FROM ratings
        WHERE user_id = $1 AND store_id = s.id
        LIMIT 1
      ) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1
  `;

  if (filters.name || filters.address) {
    values.push(`%${filters.name || filters.address}%`);

    query += `
      AND (
        s.name ILIKE $${values.length}
        OR s.address ILIKE $${values.length}
      )
    `;
  }

  query += ` GROUP BY s.id ORDER BY s.name ASC`;

  const result = await pool.query(query, values);
  return result.rows;
}

  async createStore(storeData) {
    const { name, email, address, owner_id } = storeData;

    const query = `
      INSERT INTO stores (name, email, address, owner_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [name, email, address, owner_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

}

const storesRepository = new StoresRepository();
export default storesRepository;