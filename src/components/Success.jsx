import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
    const navigate = useNavigate();

    useEffect(() => {
        window.alert("Payment Successful!");

        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);

    return (
        <div>
            <h1>Payment Success</h1>
            <p>You will be redirected to the homepage shortly...</p>
        </div>
    );
}
