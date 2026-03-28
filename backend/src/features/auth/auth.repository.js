import { pool } from "../../config/db.js";

class AuthRepository{
     async findUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  async findUserById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

    async createUser(userData) {
    const { name, email, address, password, role } = userData;

    const query = `
      INSERT INTO users (name, email, password, address, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [name, email, password, address, role];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updatePassword(id, hashedPassword) {
    const query = `
      UPDATE users
      SET password = $1
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(query, [hashedPassword, id]);
    return result.rows[0];
  }

}

const authRepository = new AuthRepository();
export default authRepository;