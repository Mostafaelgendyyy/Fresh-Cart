import React, { Component, useEffect, useState} from 'react'
import { get } from '../../API_Call/Get_Call'; // Replace with the correct relative path
import style from './Categories.module.css'
import Loader from '../Loader/Loader';
export const Categories = () => {
      const [Categories, setCategories] = useState([])
      const [subCategories, setsubCategories] = useState(null)
      const [isLoading, setisLoading] = useState(true)
      async function getCategories ()
      {
        try {
          // Await the result of the GET request
            const message = await get('https://ecommerce.routemisr.com/api/v1/Categories');
            console.log(message);

            setisLoading(false);
            setCategories(message.data.data);
  
        } catch (error) {
          console.log(error);
        }
      }
      async function getSubCategories (categoryid)
      {
        try {
          setisLoading(true);
          // Await the result of the GET request
            const message = await get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryid}/subcategories`);
            console.log(message);
            setisLoading(false);
            setsubCategories(message.data.data);
  
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        getCategories();
      },[])
    return (
       <>
            <h1 className={`${style.green} text-center font-extrabold mb-5 mt-20`}>All Categories</h1>
            <div className='container mx-auto'>
            {isLoading ? <Loader/>
            : 
            <div className='flex flex-wrap justify-center items-center'>
              {Categories.map((category)=> <>
                <div className={`${style.card} m-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_0_0_4px_#4CAF50] flex flex-col items-center justify-center`}>
                    <a href="#" onClick={() => getSubCategories(category._id)}>
                        <img className="rounded-t-lg  w-[300px] h-[350px]" src={category.image} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                        </a>
                    </div>
                </div>
                </>)}
            </div>
            }
            </div>
            {subCategories? 
            <>
              <h1 className={`${style.green} text-center font-extrabold mb-5 mt-20`}>{subCategories.length ==0 ? 'No Sub Categories Found':'All Sub Categories'}</h1>
              <div className='container mx-auto'>
                <div className='flex flex-wrap justify-center items-center'>
                  {subCategories.map((subcategory)=> <>
                    <div className={`${style.card} m-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_0_0_4px_#4CAF50] flex flex-col items-center justify-center`}>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{subcategory.name}</h5>
                            </a>
                        </div>
                    </div>
                    </>)}
                </div>
              </div>
            </>
            : 
            null
            }
      
          </>
    )
}

export default Categories