import React from 'react';
import { useEffect, } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const token = localStorage.getItem("token");

        const result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        const data = await result.json();
        setProducts(data);
    };



    const deleteProduct = async (id) => {
        console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };


    const searchHandle = async (event) => {
        let key = event.target.value;

        if (key) {
            const token = localStorage.getItem("token");

            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (result.status === 401 || result.status === 403) {
                alert("Session expired, please login again");
                return;
            }

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
            style={{
                padding: "8px",
                marginBottom: "15px",
                width: "250px",
                borderRadius: "6px",
                border: "1px solid #ccc"
            }}
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
                                        style={{ background: "crimson", marginRight: "8px" }}
                                    >
                                        Delete
                                    </button>

                                    <Link
                                        to={"/update/" + item._id}
                                        style={{
                                            textDecoration: "none",
                                            background: "#16a34a",
                                            color: "white",
                                            padding: "6px 10px",
                                            borderRadius: "5px"
                                        }}
                                    >
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

}

export default ProductList;