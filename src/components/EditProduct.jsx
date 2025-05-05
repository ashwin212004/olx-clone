import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

function EditProduct() {
    const p = useParams();
    const navigate = useNavigate();

    const [pname, setpanme] = useState('');
    const [pdesc, setdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');
    const [poldimage, setpoldimage] = useState('');
    const [poldimage2, setpoldimage2] = useState('');
    const [newImagePreview, setNewImagePreview] = useState(null); 
    const [newImagePreview2, setNewImagePreview2] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    let product = res.data.product;
                    setpanme(product.pname);
                    setdesc(product.pdesc);
                    setprice(product.price);
                    setcategory(product.category);
                    setpoldimage(product.pimage);
                    setpoldimage2(product.pimage2);
                }
            })
            .catch((err) => {
                alert('Server Error');
            });
    }, []);

    const handleApi = () => {
        if (!pname || pname.length < 2) {
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

        const formData = new FormData();
        formData.append('pid', p.productId);
        formData.append('pname', pname);
        formData.append('pdesc', pdesc);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('pimage', pimage);
        formData.append('pimage2', pimage2);
        formData.append('userId', localStorage.getItem('userId'));

        const url = 'http://localhost:4000/edit-product';

        axios.post(url, formData)
            .then((res) => {
                console.log(res);
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/my-products');
                }
            })
            .catch((err) => {
                alert('server error');
            });
    };

    const handleImageChange = (e, setPreview, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <Header />
            <div className="form2-container">
                <div className="form2-card">
                    <p className='p-2'> Edit Product here</p>

                    <label className='label-2'>Product Name</label>
                    <input className='form2-control' type='text' value={pname}
                        onChange={(e) => { setpanme(e.target.value) }} />

                    <label className='label-2'>Product Description</label>
                    <input className='form2-control' type='text' value={pdesc}
                        onChange={(e) => { setdesc(e.target.value) }} />

                    <label className='label-2'>Product Price</label>
                    <input className='form2-control' type='text' value={price}
                        onChange={(e) => { setprice(e.target.value) }} />

                    <label className='label-2'>Product Category</label>
                    <select className='form2-control' value={category}
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
                    <label className='label-2'>Product Image</label>
                    <input style={{ width: '50%' }} className='form2-control' type='file'
                        onChange={(e) => handleImageChange(e, setNewImagePreview, setpimage)} />
                    
                    {newImagePreview ? (
                        <img src={newImagePreview} alt="New Product" width={100} height={50} />
                    ) : (
                        <img src={'http://localhost:4000/' + poldimage} width={100} height={50} />
                    )}

                    <br />
                    <label className='label-2'>Product Second Image</label>
                    <input style={{ width: '50%' }} className='form2-control' type='file'
                        onChange={(e) => handleImageChange(e, setNewImagePreview2, setpimage2)} />
                    
                    {newImagePreview2 ? (
                        <img src={newImagePreview2} alt="New Product Second" width={100} height={50} />
                    ) : (
                        <img src={'http://localhost:4000/' + poldimage2} width={100} height={50} />
                    )}

                    <button onClick={handleApi} className='edit-btn'> SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
