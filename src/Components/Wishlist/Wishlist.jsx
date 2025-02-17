import React, { Component, useEffect,useContext,useState} from 'react'
import { WishlistContext } from '../../Context/WishlistContext';
import { Link, Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';


export default function Wishlist() {

    const [wishlistdata, setwishlistdata] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [isChanged, setisChanged] = useState(false)
    let {getwishlist,removefromwishlist} = useContext(WishlistContext);
    
    async function get_wishlist() {
        let response = await getwishlist();  
        setwishlistdata(response);  
        console.log(response);
        setisLoading(false);
      }

      async function removeproductfromwishlist(productid) {
        setisLoading(true);
        let response = await removefromwishlist(productid);  
        setisChanged(true);
        // setcartdata(response.data.products)
      }
    useEffect(() => {
        // if (isChanged) {
            get_wishlist();
          // After getting the cart, reset isChanged to false
          setisChanged(false);
        // }
      }, [isChanged == true]);
  // Render UI

      return(
        isLoading?
        <Loader/>
        :
        <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Wish List</h2>
  
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
  
                {wishlistdata?.data.map((product)=> <>
                  <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link to={`/product-details/${product._id}/${product.category.name}`} className="w-20 shrink-0 md:order-1">
                        <img className="h-20 w-20 dark:hidden" src={product.imageCover} alt="imac image" />
                      </Link>
  
                      <label for="counter-input" className="sr-only">Choose quantity:</label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">EGP {product.price}</p>
                        </div>
                      </div>
  
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{product.title}</a>
  
                        <div className="flex items-center gap-4">
                          <button type="button" onClick={()=>removeproductfromwishlist(product._id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                    </>)}                
                </div>
              </div>
            </div>
          </div>
        </section>
      )
        
}
