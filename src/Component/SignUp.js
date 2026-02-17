import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
        navigate("/dashboard");
    }
}, [navigate]);


    const collectData = async () => {

        let result = await fetch("http://localhost:5000/register", {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        result = await result.json();

        localStorage.setItem("user", JSON.stringify(result));

        navigate('/');
    }

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <p style={{ marginTop: "15px" }}>
                Already have an account?{" "}
                <span
                    style={{ color: "#2563eb", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                >
                    Login
                </span>
            </p>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={collectData}>
                Sign Up
            </button>
        </div>
    )
}

export default SignUp;
