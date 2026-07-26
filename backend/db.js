import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in .env");
}

const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

export default sql;