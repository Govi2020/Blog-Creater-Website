import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const query =
        "SELECT * FROM blog_website.users WHERE email = ? OR username = ?";
    db.query(query, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User Already Exists");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q =
            "INSERT INTO blog_website.users(`username`,`email`,`password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            if (!data.length)
                return res.status(200).json("User Has Been Created");
        });
    });
};

export const login = (req, res) => {
    console.log("What")
    const query =
        "SELECT * FROM blog_website.users WHERE email = ? OR username = ?";
    db.query(query, [req.body.email, req.body.username], (err, data) => {
        console.log(err);
        if (err) return res.json(err);
        if (data.length == 0)
            return res.status(400).json("Wrong Username or Password");
        console.log("Cookie")

        // Check Password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong Username or Password");

        const token = jwt.sign({ id: data[0].id }, "jwt_key");
        const { password, ...other } = data[0];
        
        console.log("Cookie")
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(other);
        // res.send("Ok")
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure: true
    }).status(200).json("User Has been logged out");
};
