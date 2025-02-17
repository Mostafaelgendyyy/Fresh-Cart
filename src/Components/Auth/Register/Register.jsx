import React, { useEffect, useState } from 'react'
import signup from '../../../assets/images/signup.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup';  // Import Yup
import { post } from '../../../API_Call/Post_Call'; // Replace with the correct relative path

export const Register = ()=>{
  const [UserMsg, setUserMsg] = useState("")
  const [divclass, setdivclass] = useState("")
  const [isLoader, setisLoader] = useState(false)
  
   let formik = useFormik({
      initialValues:{
        email:"",
        password:""
      },
      validationSchema: Yup.object({
        name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
      
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Password must be at least 8 characters')
          .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
          .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
          .matches(/[0-9]/, 'Password must contain at least one number')
          .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        
          rePassword: Yup.string()
          .required('Confirm password is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      
        phone: Yup.string()
          .required('Phone number is required')
          .matches(/^[0-9]{11}$/, 'Phone number must be 10 digits'),
      }),
      onSubmit:async (values)=>{
        console.log(JSON.stringify(values));
        try {
          // Await the result of the POST request
            setisLoader(true);

            const message = await post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values);
            setisLoader(false);
            if (message.status==201)
            {
              setdivclass('p-4 mb-4 w-full text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400')
            }
            else {
              setdivclass('p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400')
            }
            setUserMsg(message.data.message); // Set the response message to user message
           
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
        // try {
        //   const response = post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        //   setUserMsg(response.data.message); // Set success message on successful signup
        // } catch (error) {
        //   setUserMsg("Something went wrong. Please try again!"); // Handle errors and display appropriate message
        // }
      }
    });
  
    return (
       <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
        <div className="flex-1 md:w-1/2 px-4 flex justify-center">
          <img src={signup} alt="signin-img" />
        </div>
        <div className="flex-1 md:w-1/2 flex justify-center items-center">
        
          <form className="max-w-md w-full flex flex-col items-center" onSubmit={formik.handleSubmit}>
          {UserMsg && (
            <div className={divclass} role="alert">
              <span className="font-medium">{UserMsg}</span> 
            </div>
          )}
            <div className="relative z-0 w-full mb-5 group">
              <input 
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}  // To trigger validation when the input loses focus
              type="name" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
              <label for="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 text-sm">{formik.errors.name}</div>  // Show email error
               ) : null}
            
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}  // To trigger validation when the input loses focus
                 name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600 text-sm">{formik.errors.email}</div>  // Show email error
                ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}  
                name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label for="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600 text-sm">{formik.errors.password}</div>  // Show email error
                ) : null}            
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" 
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}  
                name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label for="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <div className="text-red-600 text-sm">{formik.errors.rePassword}</div>  // Show email error
                ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur} 
                name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label for="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
            
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-600 text-sm">{formik.errors.phone}</div>  // Show email error
                ) : null}
            </div>
            
            {isLoader? 
            <button
            type="submit"
            disabled
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <i className='fa fa-spinner fa-spin'></i>

          </button>
            :
            <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Register</button>
            }
            </form>
          </div>
        </div>
   
    )
}

export default Register