import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 
import LoginImage from './login.jpg'; 

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApi = () => {
        const url = 'http://localhost:4000/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        localStorage.setItem('userName', res.data.username);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Server error');
            });
    };

    return (
        <div>
        <Header />
        <div className="signup-wrapper">
            {/* Background Image */}
            <div className="signup-image">
                <img src={LoginImage} alt="Login illustration" />
            </div>

            {/* Login Form */}
            <div className="signup-container">
                <h2 className="signup-heading">Login </h2>
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
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <button className="signup-button" onClick={handleApi}>Login</button>
                <p className="login-link">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        </div>
        </div>
    );
}

export default Login;
