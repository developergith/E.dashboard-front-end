import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        const result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `Bearer ${user.auth}`,
            },
        });

        const data = await result.json();
        setProducts(data);
    };

    const deleteProduct = async (id) => {
        const user = JSON.parse(localStorage.getItem("user"));

        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${user.auth}`,
            },
        });

        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;

        if (key) {
            const user = JSON.parse(localStorage.getItem("user"));

            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `Bearer ${user.auth}`,
                },
            });

            const data = await result.json();
            setProducts(data);
        } else {
            getProducts();
        }
    };

    return (
        <div>
            <h2>Product List</h2>

            <input
                type="text"
                placeholder="Search Product..."
                onChange={searchHandle}
            />

            {
                products.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>₹ {item.price}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteProduct(item._id)}
                                        >
                                            Delete
                                        </button>

                                        <Link to={"/update/" + item._id}>
                                            Update
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3>No result found</h3>
                )
            }
        </div>
    );
};

export default ProductList;
