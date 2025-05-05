import { useEffect, useState } from 'react';
import Header from './Header';
import Categories1 from './Categories1';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function LikedProducts() {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');

    useEffect(() => {
        const url = 'http://localhost:4000/liked-products';
        const data = { userId: localStorage.getItem("userId") };
        axios.post(url, data)
            .then((res) => {
                if (res.data.product) {
                    setproducts(res.data.product);
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    }, []);

    const handlesearch = (value) => {
        setsearch(value);
    };

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (
                item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())
            ) {
                return item;
            }
        });
        setcproducts(filteredProducts);
    };

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => {
            return item.category.toLowerCase() === value.toLowerCase();
        });
        setcproducts(filteredProducts);
    };

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = 'http://localhost:4000/liked-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked');
                }
            })
            .catch(() => {
                alert('Server Error.');
            });
    };

    const handleDisLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        const url = 'http://localhost:4000/dislike-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setproducts((prevProducts) => prevProducts.filter((item) => item._id !== productId));
                }
            })
            .catch(() => {
                alert('Server Error.');
            });
    };

    const handleProduct = (id) => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please Login first');
            return;
        }
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories1 handleCategory={handleCategory} />

            <div className='d-flex justify-content-center flex-wrap'>
                {cproducts.length > 0 &&
                    cproducts.map((item) => (
                        <div key={item._id} className='card m-3' onClick={() => handleProduct(item._id)}>
                            <div className='icon-con'>
                                <FaHeart className='icons' />
                            </div>
                            <img width="300px" height="200px" src={`http://localhost:4000/${item.pimage}`} />
                            <p className='m-2'>Name: {item.pname} | {item.category}</p>
                            <h3 className='text-danger'>Price: ₹{item.price}</h3>
                            <p className='text-success one-line-desc'>
                                Description: {item.pdesc.substring(0, 50)}...
                            </p>
                        </div>
                    ))
                }
            </div>

            <div className='d-flex justify-content-center flex-wrap'>
                {products.length > 0 &&
                    products.map((item) => (
                        <div key={item._id} className='card m-3' onClick={() => handleProduct(item._id)}>
                            <div className='icon-con'>
                                <FaHeart onClick={(e) => handleDisLike(item._id, e)} className='red-icons' />
                            </div>
                            <img width="300px" height="200px" src={`http://localhost:4000/${item.pimage}`} />
                            <p className='m-2'>Name: {item.pname} | {item.category}</p>
                            <h3 className='text-danger'>Price: ₹{item.price}</h3>
                            <p className='text-success one-line-desc'>
                                Description: {item.pdesc.substring(0, 50)}...
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default LikedProducts;
