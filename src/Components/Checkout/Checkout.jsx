import React, { useContext, useEffect, useState } from 'react'
import signup from '../../assets/images/OIP.jpeg'
import { useFormik } from 'formik'
import * as Yup from 'yup';  // Import Yup
import { CartContext } from '../../Context/CartContext';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function Checkout() {
   const [divclass, setdivclass] = useState("")
   const [isLoader, setisLoader] = useState(false)
   let {onlinepay} = useContext(CartContext);
   const params = useParams();


    let formik = useFormik({
       initialValues:{
         details:"",
         city:""
       },
       validationSchema: Yup.object({
        details: Yup.string()
         .required('Details is required')
         .min(3, 'Details must be at least 3 characters'),
       
         city: Yup.string()
         .required('City is required')
         .min(3, 'City must be at least 3 characters'),
         
         phone: Yup.string()
           .required('Phone number is required')
           .matches(/^[0-9]{11}$/, 'Phone number must be 10 digits'),
       }),
       onSubmit:async (values)=>{
         
         try {
          setisLoader(true)
           let response = await onlinepay(params.id,values)
        //    console.log(response.status)
        //    console.log(response)
          setisLoader(false)
           if (response.status == 200 && values.paymentMethod=='online')
           {
            // console.log(response.data.session.url)
            window.location.href = response.data.session.url; // Set the URL to navigate to
           }
           else if (response.status == 200 && values.paymentMethod=='cash')
            {
                window.location.href = response.data.session.success_url; // Set the URL to navigate to

            }
            else if(response.status != 200)
            {
                window.location.href = response.data.session.cancel_url;
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
       }
     });
   
     return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
         
         <div className="flex-1 md:w-full flex justify-center items-center">
         
           <form className="max-w-md w-full flex flex-col items-center" onSubmit={formik.handleSubmit}>
           
             <div className="relative z-0 w-full mb-5 group">
               <input 
               onChange={formik.handleChange}
               value={formik.values.details}
               onBlur={formik.handleBlur}  // To trigger validation when the input loses focus
               type="details" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
               <label for="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
               {formik.touched.details && formik.errors.details ? (
               <div className="text-red-600 text-sm">{formik.errors.details}</div>  // Show email error
                ) : null}
             
             </div>
             <div className="relative z-0 w-full mb-5 group">
                 <input type="city"
                 onChange={formik.handleChange}
                 value={formik.values.emacityil}
                 onBlur={formik.handleBlur}  // To trigger validation when the input loses focus
                  name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                 <label for="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                 {formik.touched.city && formik.errors.city ? (
                   <div className="text-red-600 text-sm">{formik.errors.city}</div>  // Show email error
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
             
  {/* Radio Buttons Section */}
  <div className="mb-5 w-full flex flex-col space-y-3">
    <div className="flex items-center space-x-3">
      <input
        type="radio"
        id="option1"
        name="paymentMethod"
        value="cash"
        onChange={formik.handleChange}
        checked={formik.values.paymentMethod === 'cash'}
        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
      />
      <label for="option1" className="text-sm text-gray-700">Cash Payment</label>
    </div>
    <div className="flex items-center space-x-3">
      <input
        type="radio"
        id="option2"
        name="paymentMethod"
        value="online"
        onChange={formik.handleChange}
        checked={formik.values.paymentMethod === 'online'}
        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
      />
      <label for="option2" className="text-sm text-gray-700">Online Payment</label>
    </div>
   
    {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
      <div className="text-red-600 text-sm">{formik.errors.paymentMethod}</div>
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
             <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Pay</button>
             }
             </form>
           </div>
         </div>
    
     )
}
