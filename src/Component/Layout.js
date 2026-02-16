import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";

const Layout = ({ children }) => {

    const navigate = useNavigate();   // ✅ inside component

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2 className="logo-text">E-Admin</h2>

                <Link to="/">Products</Link>
                <Link to="/add">Add Product</Link>

                <button
                    onClick={logout}
                    style={{
                        marginTop: "auto",
                        background: "crimson",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>

            <div className="main">
                <div className="topbar">
                    <h3>Admin Dashboard</h3>
                </div>

                <div className="content">
                    {children}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Layout;
