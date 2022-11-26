import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/authContent";

export default function Login() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [error, seError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(inputs)
            navigate("/");
        } catch (error) {
            console.log(error);
            seError(
                error?.response?.data
                    ? error.response.data
                    : "Sorry Some Error Occured"
            );
        }
    };

    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
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
                <button onClick={handleSubmit}>Login</button>
                {error && <p>{error}</p>}

                <span>
                    Don't Have a account <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    );
}
