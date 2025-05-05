import { useEffect, useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories1 from './Categories1';
import { FaHeart } from 'react-icons/fa';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [likedproducts, setlikedproducts] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    console.log(res.data.product);
                    setproducts(res.data.product);
                }
            })
            .catch(() => {
                alert('Server Error.');
            });

        const url2 = 'http://localhost:4000/liked-products';
        let data = { userId: localStorage.getItem("userId") };
        axios.post(url2, data)
            .then((res) => {
                if (res.data.product) {
                    setlikedproducts(res.data.product);
                }
            })
            .catch(() => {
                alert('Server Error.');
            });
    }, [refresh]);

    const handlesearch = (value) => {
        setsearch(value);
    };

    const handleClick = () => {
        const url = `http://localhost:4000/search?search=${search}&loc=${localStorage.getItem('userLoc')}`;
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch(() => {
                alert('Server Error.');
            });
    };

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => {
            return item.category.toLowerCase() === value.toLowerCase();
        });
        setcproducts(filteredProducts);
        setissearch(true);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please Login first');
            return;
        }
        const url = 'http://localhost:4000/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setrefresh(!refresh);
                }
            })
            .catch(() => {
                alert('Server Error.');
            });
    };

    const handleDisLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please Login first');
            return;
        }
        const url = 'http://localhost:4000/dislike-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setrefresh(!refresh);
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

            {issearch && cproducts.length > 0 && (
                <div>
                    <h5>SEARCH RESULT
                        <button className="clear-btn" onClick={() => setissearch(false)}>CLEAR</button>
                    </h5>
                    <div className='d-flex justify-content-center flex-wrap'>
                        {cproducts.map((item) => (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className='card m-3'>
                                <div className='icon-con'>
                                    {likedproducts.find((likedItem) => likedItem._id === item._id)
                                        ? <FaHeart onClick={(e) => handleDisLike(item._id, e)} className='red-icons' />
                                        : <FaHeart onClick={(e) => handleLike(item._id, e)} className='icons' />}
                                </div>
                                <img width="300px" height="200px" src={`http://localhost:4000/${item.pimage}`} />
                                <p className='m-2'>Name: {item.pname} | {item.category}</p>
                                <h3 className='text-danger'>Price: ₹{item.price}</h3>
                                <p className='text-success one-line-desc'>
            Description: {item.pdesc.substring(0, 50)}...
        </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!issearch && (
                <div className='d-flex justify-content-center flex-wrap'>
                    {products.length > 0 && products.map((item) => (
                        <div onClick={() => handleProduct(item._id)} key={item._id} className='card m-3'>
                            <div className='icon-con'>
                                {likedproducts.find((likedItem) => likedItem._id === item._id)
                                    ? <FaHeart onClick={(e) => handleDisLike(item._id, e)} className='red-icons' />
                                    : <FaHeart onClick={(e) => handleLike(item._id, e)} className='icons' />}
                            </div>
                            <img width="300px" height="200px" src={`http://localhost:4000/${item.pimage}`} />
                            <p className='m-2'>Name: {item.pname} | {item.category}</p>
                            <h3 className='text-danger'>Price: ₹{item.price}</h3>
                            <p className='text-success one-line-desc'>
            Description: {item.pdesc.substring(0, 50)}...
        </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
