import React, { Component, useEffect, useState} from 'react'
import { get } from '../../API_Call/Get_Call'; // Replace with the correct relative path
import style from './Brands.module.css'
import Loader from '../Loader/Loader';


export const Brands = () => {
    const [Brands, setBrands] = useState([])
    const [isLoading, setisLoading] = useState(true)
    async function getBrands ()
    {
      try {
        // Await the result of the GET request
          const message = await get('https://ecommerce.routemisr.com/api/v1/brands');
          console.log(message);
          setisLoading(false);
          setBrands(message.data.data);

      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      getBrands();
    },[])
    return (
    <>
      <h1 className={`${style.green} text-center font-extrabold mb-5 mt-20`}>All Brands</h1>
      <div className='container mx-auto'>
      {isLoading ? <Loader/>
      : 
      <div className='flex flex-wrap justify-center items-center'>
        {Brands.map((brand)=> <>
          <div className={`${style.card} m-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_0_0_4px_#4CAF50] flex flex-col items-center justify-center`}>
              <a href="#">
                  <img className="rounded-t-lg w-[300px] h-[350px]" src={brand.image} alt="" />
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{brand.name}</h5>
                  </a>
              </div>
          </div>
          </>)}
      </div>
      }
      </div>
    </>
    )
}
export default Brands