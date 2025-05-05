import { useEffect } from "react";
import { useState } from 'react';
import Header from "./Header";
import axios from 'axios';
import './MyProfile.css'; 

function MyProfile() {
    const [user, setUser] = useState({})

    useEffect(() => {
        let url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                console.log(res.data)
                if (res.data.user) {
                    setUser(res.data.user)
                }

            })
            .catch((err) => {
                alert('Server Error.')

            })

    }, [])


    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    }

    return (
        <div>
            <Header />
            <div className="profile-container">
                <div className="profile-header text-center">
                    <div className="avatar-circle">
                        <span className="initials">{getInitial(user.username)}</span>
                    </div>
                    <h5 className="mt-3">User Profile</h5>
                </div>

                <div className="profile-details">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><strong>Username</strong></td>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Mobile</strong></td>
                                <td>{user.mobile}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
