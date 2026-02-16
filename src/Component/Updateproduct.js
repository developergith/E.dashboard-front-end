import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const Updateproduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        const token = localStorage.getItem("token");

        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        result = await result.json();

        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    };



    const updateProduct = async () => {
        const token = localStorage.getItem("token");

        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        result = await result.json();
        navigate("/");
    };


    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type='text' placeholder='Enter Product Name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />


            <input type='text' placeholder='Enter Product Price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />

            <input type='text' placeholder='Enter Product category' className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} />


            <input type='text' placeholder='Enter Product company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} />

            <button onClick={updateProduct} className='appbutton'>Update Product</button>
        </div>
    )
};

export default Updateproduct;