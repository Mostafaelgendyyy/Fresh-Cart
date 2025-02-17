import React, { useContext, useState } from 'react'
import signin from '../../../assets/images/signin-DlR7P608.png'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';  // Import Yup
import { put } from '../../../API_Call/Put_Call'; // Replace with the correct relative path
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../../Context/TokenContext';
import toast from "react-hot-toast";

// import { CircularProgress } from 'react-loader-spinner';

const ResetPassword = () => {
  let {Token,setToken} = useContext(TokenContext);
  const [isLoader, setisLoader] = useState(false)

  const navigate = useNavigate();
  let formik = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")  // Email should be valid
        .required("Email is required"),  // Email is required
        newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")  // Minimum password length
        .required("Password is required")  // Password is required
    }),
    onSubmit: async ()=>{
      try {
          setisLoader(true);
        // Await the result of the POST request
          const message = await put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', formik.values);
          setisLoader(false);
          console.log(message);
          if (message.status<300)
          {
            localStorage.setItem('token',message.data.token);
            
            setToken(message.token);
            // localStorage.setItem('email',message.data.user.email);
            navigate("/")
          }
          else {
            toast.error(message.data.message);

          }
          
      } catch (error) {
        console.log(error)
        if (error.data.request==201)
        {
            toast.success(error.data.message);
        }
        else {
            toast.error(error.data.message);
        }
      }
    }
  });

    return (
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">

        <div className="flex-1 md:w-1/2 px-4 flex justify-center">
          <img src={signin} alt="signin-img" />
        </div>
        <div className="flex-1 md:w-1/2  justify-center items-center">
        <h1 class="mb-10 text-3xl font-bold text-gray-700 ">Reset Data</h1>

          <form className="max-w-md w-full flex flex-col items-center" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}  // To trigger validation when the input loses focus
                required
              />
              
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>  // Show email error
            ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="newPassword"
                name="newPassword"
                id="newPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}  // To trigger validation when the input loses focus
                required
              />
              <label
                htmlFor="newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-600 text-sm">{formik.errors.newPassword}</div>  // Show password error
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
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Reset
            </button>
            }
            
            
          </form>
        </div>
    </div>
    
    )
}

export default ResetPassword