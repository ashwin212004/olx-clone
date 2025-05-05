import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';
import axios from "axios";
import './Signup.css'; 
import signupImage from './signup1.jpg'; // Import your image

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    const handleApi = () => {
        console.log({ username, password });
        const url = 'http://localhost:4000/signup';
        const data = { username, password, mobile, email };
        
        axios.post(url, data)
            .then((res) => {
                console.log(res.data);
                if (res.data.message === 'saved success') {
                    alert(res.data.message);
                    navigate('/login'); 
                } else {
                    alert(res.data.message);  
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Server error");
            });
    };

    return (
        <div>
            <Header />
            <div className="signup-wrapper">
                <div className="signup-image">
                    <img src={signupImage} alt="Signup illustration" />
                </div>
                <div className="signup-container">
                    <h2 className="signup-heading">SWAPZONE</h2>
                    <p className="signup-tagline">Buy, Sell, Discover - All in One Place!</p>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile:</label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter your mobile number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button className="signup-button" onClick={handleApi}>Sign Up</button>
                    <p className="login-link">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
