import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/dashboard");
        }
    }, [navigate]);


    const handleSubmit = async () => {

        if (!email || !password || (!isLogin && !name)) {
            alert("Please fill all fields");
            return;
        }

        const url = isLogin
            ? "http://localhost:5000/login"
            : "http://localhost:5000/register";

        const bodyData = isLogin
            ? { email, password }
            : { name, email, password };

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });

        let result = await response.json();

        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
        } else {
            alert(result.result || "Something went wrong");
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            {!isLogin && (
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            )}

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

            <button onClick={handleSubmit}>
                {isLogin ? "Login" : "Sign Up"}
            </button>

            <p style={{ marginTop: "15px" }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span
                    style={{ color: "#2563eb", cursor: "pointer", marginLeft: "5px" }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Sign Up" : "Login"}
                </span>
            </p>
        </div>
    );
};

export default Login;
