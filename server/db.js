import mysql from "mysql";

export const db = mysql.createConnection({
    host: "containers-us-west-100.railway.app",
    user: "root",
    password: "YtNhNL6cepRtzns3EBag",
    port: 5794
});

db.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});
