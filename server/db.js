import mysql from "mysql";

export const db = await mysql.createConnection({
    host:"localhost",
    user:"root"
})

console.log(db)
