import { pool } from "../../config/db.js";

export default class AdminRepository {
  async getCounts() {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const stores = await pool.query("SELECT COUNT(*) FROM stores");
    const ratings = await pool.query("SELECT COUNT(*) FROM ratings");

    return {
      users: users.rows[0].count,
      stores: stores.rows[0].count,
      ratings: ratings.rows[0].count,
    };
  }

  async createUser(userData) {
  const { name, email, password, address, role } = userData;

  const query = `
    INSERT INTO users (name, email, password, address, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [name, email, password, address, role];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async getAllUsers(filters = {}) {
  let query = `
    SELECT id, name, email, address, role
    FROM users
    WHERE 1=1
  `;

  const values = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    query += `
      AND (
        name ILIKE $${values.length}
        OR email ILIKE $${values.length}
        OR address ILIKE $${values.length}
      )
    `;
  }

  if (filters.role) {
    values.push(filters.role);
    query += ` AND role = $${values.length}`;
  }

  const sortByMap = {
    name: "name",
    email: "email",
    address: "address",
    role: "role",
  };

  const sortBy = sortByMap[filters.sortBy] || "name";
  const order = String(filters.order).toUpperCase() === "DESC" ? "DESC" : "ASC";

  query += ` ORDER BY ${sortBy} ${order}`;

  const result = await pool.query(query, values);
  return result.rows;
}

async getAllStores(filters = {}) {
    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;

    const values = [];

    if (filters.search) {
      values.push(`%${filters.search}%`);
      query += `
        AND (
          s.name ILIKE $${values.length}
          OR s.email ILIKE $${values.length}
          OR s.address ILIKE $${values.length}
        )
      `;
    }

    query += `
      GROUP BY s.id
      ORDER BY s.name ASC
    `;

    const result = await pool.query(query, values);
    return result.rows;
  }

async getUserDetails(id) {
  const query = `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.address,
      u.role,
      CASE 
        WHEN u.role = 'owner' THEN COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0)
        ELSE NULL
      END AS rating
    FROM users u
    LEFT JOIN stores s ON s.owner_id = u.id
    LEFT JOIN ratings r ON r.store_id = s.id
    WHERE u.id = $1
    GROUP BY u.id
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
}

}