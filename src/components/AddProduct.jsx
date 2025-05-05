import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setpanme] = useState('');
    const [pdesc, setdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('Bikes');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    },[]);

    const handleApi = () => {
        if (!pname || pname.length <2) {
            alert('Product name must be at least 2 characters long.');
            return;
        }
        
        if (!pdesc || pdesc.length < 10) {
            alert('Product description must be at least 10 characters long.');
            return;
        }
        
        if (!price || isNaN(price) || price <= 0) {
            alert('Price must be a positive number.');
            return;
        }
        
        if (!pimage || !pimage2) {
            alert('Both images are required.');
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude);
            formData.append('plong', position.coords.longitude);
            formData.append('pname', pname);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('pimage', pimage);
            formData.append('pimage2', pimage2);
            formData.append('userId', localStorage.getItem('userId'));


            const url = 'http://localhost:4000/add-product';

            axios.post(url, formData)
                .then((res) => {
                    console.log(res);
                    if (res.data.message) {
                        alert(res.data.message);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    alert('server error');
                });
        });
    };

    return (
        <div>
            <Header />
            <div className="form-container">
                <div className="form-card">
                    <p>Connect locally  : Add your products to Swapzone!!</p>
                    <label>Product Name</label>
                    <input className='form-control' type='text' value={pname}
                        onChange={(e) => { setpanme(e.target.value) }} />

                    <label>Product Description</label>
                    <input className='form-control' type='text' value={pdesc}
                        onChange={(e) => { setdesc(e.target.value) }} />

                    <label>Product Price</label>
                    <input className='form-control' type='text' value={price}
                        onChange={(e) => { setprice(e.target.value) }} />

                    <label>Product Category</label>
                    <select className='form-control' value={category}
                        onChange={(e) => { setcategory(e.target.value) }}>
                        <option>Bikes</option>
                        <option>Mobiles</option>
                        <option>Cloth</option>
                        <option>Property</option>
                        <option>Toys</option>
                        <option>Furniture</option>
                        <option>Vehicles</option>
                        <option>Electronics</option>
                        <option>Beauty</option>
                    </select>

                    <label>Product Image</label>
                    <input className='form-control' type='file'
                        onChange={(e) => { setpimage(e.target.files[0]) }} />

                    <label>Product Second Image</label>
                    <input className='form-control' type='file'
                        onChange={(e) => { setpimage2(e.target.files[0]) }} />

                    <button onClick={handleApi} className='add-btn'>SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
