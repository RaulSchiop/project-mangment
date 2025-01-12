import mysql from "mysql2/promise";

export const db = mysql.createPool({
   host: "host.docker.internal",
   user: "root",
   password: "root123",
   database: "management",
});
