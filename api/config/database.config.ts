import { Client } from 'pg';


// Connection to the mysql database
const connection = new Client({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'blog_db',
  port: 5432
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

export default connection;