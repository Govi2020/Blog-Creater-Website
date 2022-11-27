import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, seError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/register", inputs, {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            });
            navigate("/login");
        } catch (error) {
            seError(error.response.data);
        }
    };

    console.log(inputs);

    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input
                    type="name"
                    required
                    placeholder="Enter Your UserName"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    required
                    placeholder="Enter Your Password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Register</button>
                {error && <p>{error}</p>}
                <span>
                    Already Have a Account ? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
}
