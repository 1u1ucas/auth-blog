import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "blog_db",
  port: 5432,
});

export default pool;
