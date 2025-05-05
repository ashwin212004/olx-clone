import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import sellImage from './sell.jpg'; 
import favImage from './fav.jpg'; 
import { BiLogOut ,BiSolidCartAdd } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";

function Header(props) {
  const [loc, setloc] = useState(null);
  const [showOver, setshowOver] = useState(false);
  const [usernameFirstLetter, setUsernameFirstLetter] = useState(<IoPerson/>); 
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('userName');
    if (username) {
      setUsernameFirstLetter(username.charAt(0).toUpperCase());
    }
  }, []);

  const handelLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName'); 
    navigate('/login');
  };

  let locations = [
    {
      latitude: 19.0760,
      longitude: 72.8777,
      placeName: 'Mumbai, Maharashtra',
    },
    {
      latitude: 28.6139,
      longitude: 77.2090,
      placeName: 'New Delhi, Delhi',
    },
    {
      latitude: 22.5726,
      longitude: 88.3639,
      placeName: 'Kolkata, West Bengal',
    },
    {
      latitude: 13.0827,
      longitude: 80.2707,
      placeName: 'Chennai, Tamil Nadu',
    },
    {
      latitude: 12.9716,
      longitude: 77.5946,
      placeName: 'Bangalore, Karnataka',
    },
    {
      latitude: 32.7266,
      longitude: 74.8570,
      placeName: 'Jammu, Jammu & Kashmir',
    },
  ];

  return (
    <div className='header-contaainer d-flex justify-content-between'>
      <div className="header">
        <Link className='home-link' to="/">Home</Link>
        <select className='loaction-drop' value={loc} onChange={(e) => {
          localStorage.setItem('userLoc', e.target.value);
          setloc(e.target.value);
        }}>
          {locations.map((item, index) => (
            <option value={`${item.latitude},${item.longitude}`} key={index}>
              {item.placeName}
            </option>
          ))}
        </select>
        <input
          className="search"
          type='text'
          placeholder='Looking for something? Start your search here...'
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />
        <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}>
          <FaSearch />
        </button>
      </div>
      
            <div>
              {!!localStorage.getItem('token') && (
                <Link to="/liked-products">
                  <img  className='my-fav' src={favImage} alt="Sell illustration" />
                </Link>
              )}
            </div>
            < div >
              {!!localStorage.getItem('token') && (
                <Link to="/add-product">
                  <img  className='add-product' src={sellImage} alt="Sell illustration" />
                </Link>
              )}
            </div>

      <div className='profile-icon'>
        <div
          onClick={() => setshowOver(!showOver)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#002f34',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop:"10px",
          }}>
          {usernameFirstLetter}
        </div>

        {showOver && (
          <div style={{
            width: '175px',
            minHeight: 'auto',
            background: 'white',
            position: 'absolute',
            top: '0',
            right: '0',
            marginTop: '50px',
            marginRight: '50px',
            color: 'white',
            fontSize: '14px',
            zIndex: 1,
            borderRadius: '7px',
          }}>
              
            <div>
              {!!localStorage.getItem('token') && (
                <Link to="/my-products">
                  <button className='my-ads-btn'><BiSolidCartAdd />My Ads</button>
                </Link>
              )}
            </div>
            <div>
              {!!localStorage.getItem('token') && (
                <Link to="/my-profile">
                  <button className='my-profile-btn'> <IoPerson />profile</button>
                </Link>
              )}
            </div>
            <div>
              {!localStorage.getItem('token') ? (
                <Link to="/login">
                <button className='login-btn'>LOGIN</button>
              </Link>
              ) : (
                <button className='logout-btn' onClick={handelLogout}> <BiLogOut />LOGOUT</button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default Header;
