import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.auth}`
            },
            body: JSON.stringify({
                name,
                price,
                category,
                company
            })
        });

        result = await result.json();
        console.log(result);

        navigate("/"); // after add go to product list
    };

    return (
        <div className='product'>
            <h1>Add Product</h1>

            <input
                type='text'
                placeholder='Enter Product Name'
                className='inputBox'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className='invalid-input'>Enter Valid Name</span>}

            <input
                type='text'
                placeholder='Enter Product Price'
                className='inputBox'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className='invalid-input'>Enter Valid Price</span>}

            <input
                type='text'
                placeholder='Enter Product Category'
                className='inputBox'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className='invalid-input'>Enter Valid Category</span>}

            <input
                type='text'
                placeholder='Enter Product Company'
                className='inputBox'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className='invalid-input'>Enter Valid Company</span>}

            <button onClick={addProduct} className='appbutton'>
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;
