import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    let user = null;
    try {
        user = auth ? JSON.parse(auth) : null;
    } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
    }

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <div>
            <img
                alt="logo"
                className="logo"
                src="https://static.vecteezy.com/system/resources/previews/016/471/452/original/abstract-modern-ecommerce-logo-ecommerce-logo-design-shop-logo-design-template-creative-ecommerce-logo-vector.jpg"
            />

            {auth ?
                <ul className="nav-ul">
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link to="/update">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li>
                        <Link onClick={logout} to="/signup">
                            Logout ({user?.name})
                        </Link>
                    </li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>

                </ul>
            }
        </div>
    )
};

export default Nav;
