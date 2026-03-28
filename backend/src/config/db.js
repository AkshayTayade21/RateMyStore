import {Pool} from 'pg';
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectToDatabase = async ()=>{
     try {
    await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.log("Database error", err);
  }
}

export default connectToDatabase;