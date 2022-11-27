import mysql from "mysql2";

export const db = mysql.createConnection({
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "password",
    port: process.env.MYSQLPORT || "3306",
    database: process.env.MYSQLDATABASE || "blog_website"
});

db.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("Connected To DataBase with ID " + db.threadId);
});
