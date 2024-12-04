import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "blog_db",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

export default pool;
