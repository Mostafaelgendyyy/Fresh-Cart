import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { post } from '../../../API_Call/Post_Call'; // Replace with the correct relative path
import toast from "react-hot-toast";
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';

export default function OtpVerify() {
    const [isLoader, setisLoader] = useState(false)
    const navigate = useNavigate();
        
    // Formik setup
    const formik = useFormik({
        initialValues: {
            otp: ['', '', '', '', '', ''],
        },
        validate: (values) => {
            const errors = {};
            if (values.otp.slice(0, 5).some((digit) => digit === '')) {
                errors.otp = 'Please enter all digits';
            }
            return errors;
        },
        onSubmit: async (values) => {
            // Handle form submission
            console.log('OTP Submitted:', values.otp.join(''));
            try {
                let body = {"resetCode":values.otp.join('')}
                setisLoader(true);
                const message = await post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', body);
                setisLoader(false);
                console.log(message);
                if (message.status<300)
                {
                    toast.success(message?.data?.status);
                    navigate('/reset')
                }
                else 
                {
                    toast.error(message?.data?.message);
                }
                
                
             } catch (error) {
               console.log(error)
               if (error.data.request==201)
               {
                 setdivclass('p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400')
               }
               else {
                 setdivclass('p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400')
               }
               setUserMsg(error.data.message); // Set the response message to user message
             }
        },
    });

    // Handle input change
    function handleInputChange(e, index) {
        const value = e.target.value;
        if (value.length === 1) {
            formik.setFieldValue(`otp[${index}]`, value);
            if (index < 5) {
                document.getElementById(`input${index + 2}`).focus();
            }
        }
    }

    return ( isLoader?
        <Loader/>:
        <>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs space-x-4">
                                    {formik.values.otp.map((digit, index) => (
                                        <div className="w-16 h-16" key={index}>
                                            <input
                                                className="w-full h-full text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-green-700"
                                                type="text"
                                                maxLength="1"
                                                id={`input${index + 1}`}
                                                value={digit}
                                                onChange={(e) => handleInputChange(e, index)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {formik.errors.otp && (
                                    <div className="text-red-500 text-sm">{formik.errors.otp}</div>
                                )}

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-700 border-none text-white text-sm shadow-sm"
                                        >
                                            Verify Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
