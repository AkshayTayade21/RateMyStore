import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectToDatabase = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.log("Database error", err);
  }
};

export default connectToDatabase;