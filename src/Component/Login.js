import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/dashboard');

        }
    }, [navigate]);  // ✅ dependency add ki

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json'
            }
        });

        result = await result.json();

        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", result.auth);
            navigate('/');
        } else {
            alert("Please enter correct details");
        }
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <p style={{ marginTop: "15px" }}>
                Don't have an account?{" "}
                <span
                    style={{ color: "#2563eb", cursor: "pointer" }}
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </span>
            </p>

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

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
