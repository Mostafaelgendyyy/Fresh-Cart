import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Allorders() {
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    // Use effect to fade out the alert after a few seconds (optional)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
            navigate('/')

        }, 5000); // Alert disappears after 4 seconds

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center ">
            {showAlert && (
                <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-lg space-y-4 transform transition-all duration-500 ease-in-out scale-100 opacity-100 hover:scale-105 hover:opacity-90">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-xl text-green-600">Payment Successful</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="text-green-500 text-sm">
                        <p>Your payment has been processed successfully. Thank you for your purchase!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
