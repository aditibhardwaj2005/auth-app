import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
  host: "127.0.0.1",        // ← Changed from localhost
  user: "root",
  password: "",             // ← If you set any password in XAMPP, put it here
  database: "auth_system",
  port: 3306,               // change to 3307 if you changed the port above
});