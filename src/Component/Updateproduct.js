import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Updateproduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const getProductDetails = async () => {

            const token = localStorage.getItem("token");

            let response = await fetch(`http://localhost:5000/product/${params.id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            let result = await response.json();

            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        };

        getProductDetails();

    }, [params.id]);  // ✅ ESLint satisfied

    const updateProduct = async () => {

        const token = localStorage.getItem("token");

        await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });

        navigate("/dashboard");
    };

    return (
        <div className='product'>
            <h1>Update Product</h1>

            <input
                type='text'
                placeholder='Enter Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type='text'
                placeholder='Enter Product Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type='text'
                placeholder='Enter Product category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                type='text'
                placeholder='Enter Product company'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <button onClick={updateProduct}>
                Update Product
            </button>
        </div>
    );
};

export default Updateproduct;

