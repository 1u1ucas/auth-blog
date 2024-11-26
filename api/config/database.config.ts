import mysql, { ResultSetHeader } from "mysql2";

// Connection to the mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'blog_db',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

export default connection;