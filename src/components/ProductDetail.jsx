import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import Header from "./Header";
import io from 'socket.io-client';
import './ProductDetail.css'; 
import dopayment from './payment';

let socket;
function ProductDetail() {
    const navigate =useNavigate()

    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [showContact, setShowContact] = useState(true); 
    const { productId } = useParams();
    const [userid,setuserid] = useState("")
    useEffect(() => {
        let data ={ userId : localStorage.getItem("userId")}
        if(data){
            setuserid(data)
        }

    }, [])
    const payment=(item,userid)=>{
        console.log("userID**************",userid);
        if(userid.userId!==null){
            console.log("doing payemnt")
            const url = `http://localhost:4000/get-user/${userid.userId}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    const user = res.data.user
                    dopayment(item,user)
                }
            })
            .catch((err) => {
                alert('Sercer Err.')

            })
        }else{
            console.log("login")
            navigate('/login')
        }
    }

    useEffect(() => {
        socket = io('http://localhost:4000');
        socket.on('connect', () => {
            console.log("Socket connected");
        });
    }, []);

    useEffect(() => {
        socket.on('getMsg', (data) => {
            const filteredMsgs = data.filter((item) => item.productId === productId);
            setMsgs(filteredMsgs);
        });
    }, [productId]);

    const handleSend = () => {
        const data = {
            username: localStorage.getItem('userName'),
            msg,
            productId: localStorage.getItem('productId')
        };
        socket.emit('sendMsg', data);
        setMsg('');
    };

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                    localStorage.setItem('productId', res.data.product._id);
                }
            })
            .catch(() => {
                alert('Server Error');
            });
    }, [productId]);

    const handleContact = (addedBy) => {
        const url = 'http://localhost:4000/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                    setShowContact(false); 
                }
            })
            .catch(() => {
                alert('Server Error');
            });
    };

    const handleHideContact = () => {
        setUser(null);
        setShowContact(true); 
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                {product && (
                    <div className="row">
                        {/* Product Details Section */}
                        <div className="col-md-7 product-details">
                            <div className="product-images">
                                <img className="img-fluid" src={'http://localhost:4000/' + product.pimage} alt="Product" />
                                {product.pimage2 && (
                                    <img className="img-fluid mt-3" src={'http://localhost:4000/' + product.pimage2} alt="Product 2" />
                                )}
                            </div>
                            <div className="product-info mt-3">
                                <h5>Product Name: {product.pname}</h5>
                                <p className="cat-det">Category: {product.category}</p>
                                <h3 className="text-danger">Price: ₹{product.price}</h3>
                                <p className="textdesc">Description: {product.pdesc}</p>
                                
                                {showContact && product.addedBy && (
                                    <button className="btn btn-outline-primary" onClick={() => handleContact(product.addedBy)}>
                                        Show Contact Details
                                    </button>
                                )}
                                {user && (
                                    <div className="contact-info mt-3">
                                        <h6>Contact Information:</h6>
                                        {user.username && <p><strong>Name:</strong> {user.username}</p>}
                                        {user.email && <p><strong>Email:</strong> {user.email}</p>}
                                        {user.mobile && <p><strong>Mobile:</strong> {user.mobile}</p>}
                                        <button className="btn btn-outline-primary" onClick={handleHideContact}>
                                            Hide Contact Details
                                        </button>
                                    </div>
                                    
                                )}
                                <button className="buybtn m-3" onClick={()=>payment(product,userid)}>Buy now</button>
                            </div>
                        </div>

                        {/* Chat Section */}
                        <div className="col-md-5 chat-section">
                            <h5 className="chat-title">Chat</h5>
                            <div className="chat-box">
                                {msgs && msgs.length > 0 &&
                                    msgs.map((item, index) => (
                                        <div key={index} className={`chat-msg ${item.username === localStorage.getItem('userName') ? 'my-msg' : 'other-msg'}`}>
                                            <span className="chat-username">{item.username}:</span> {item.msg}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="chat-input mt-3">
                                <input
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    className="form-control"
                                    type="text"
                                    placeholder="Type your message..."
                                />
                                <button onClick={handleSend} className="btn btn-primary mt-2 w-100">Send</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetail;
