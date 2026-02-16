import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState(false);
    const AddProduct = async () => {
        console.log(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.warn(name, price, category, company);
        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name,
                price,
                category,
                company
            })
        });

        result = await result.json();
        console.warn(result);
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type='text' placeholder='Enter Product Name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <spam className='invalid-input'>Enter Valid Name</spam>}

            <input type='text' placeholder='Enter Product Price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <spam className='invalid-input'>Enter Valid Price</spam>}

            <input type='text' placeholder='Enter Product category' className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <spam className='invalid-input'>Enter Valid category</spam>}

            <input type='text' placeholder='Enter Product company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <spam className='invalid-input'>Enter Valid company</spam>}

            <button onClick={AddProduct} className='appbutton'>Add Product</button>
        </div>
    )
};

export default AddProduct;