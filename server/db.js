import mysql from "mysql";

export const db = await mysql.createConnection(process.env.MYSQL_URL)

