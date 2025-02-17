import { createContext, useEffect, useState } from "react";
import { post } from "../API_Call/Post_Call";
import toast from "react-hot-toast";
import { get } from "../API_Call/Get_Call";
import { _delete } from "../API_Call/Delete_call";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props)
{
    const initialWishlistCounter = localStorage.getItem('wishlistCounter') || 0;
    const [wishlistCounter, setwishlistCounter] = useState(Number(initialWishlistCounter));
    useEffect(() => {
        // Sync wishlistCounter with localStorage whenever it changes
        localStorage.setItem('wishlistCounter', wishlistCounter);
    }, [wishlistCounter]);

     async function addtowishlist (productid)
      {
        try {
          // Await the result of the GET request
            let body = { 'productId': productid}
            let headers = {
                token: localStorage.getItem('token')
            }
            console.log(body);
            const message = await post('https://ecommerce.routemisr.com/api/v1/wishlist',body,
                {
                    headers:headers
                }
            );
            if(message.status == 200)
            {
                toast.success(message?.data?.message);
                setwishlistCounter(wishlistCounter+1)
            }
            else {
                toast.error(message?.data?.message);
            }
            return message;


    
        } catch (error) {
          console.log(error);
          toast.error('Error in adding to Wishlist');

        }
      }
      async function getwishlist ()
      {
        try {
          // Await the result of the GET request
            let headers = {
                token: localStorage.getItem('token')
            }
            const message = await get('https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    headers:headers
                }
            );
            console.log(message?.data);
            // if(message.status == 200)
            // {
            //     toast.success(message?.data?.message);
            // }
            // else {
            //     toast.error(message?.data?.message);
            // }
            return message?.data;
        } catch (error) {
          toast.error('Error in getting Wishlist');

        }
      }
      async function removefromwishlist (productid)
      {
        try {
          // Await the result of the GET request
            let headers = {
                token: localStorage.getItem('token')
            }
            const message = await _delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,
                {
                    headers:headers
                }
            );
            // console.log(message);
            setwishlistCounter(wishlistCounter-1)
            // if(message.status == 200)
            // {
            //     toast.success(message?.data?.message);
            // }
            // else {
            //     toast.error(message?.data?.message);
            // }
            return message?.data;
        } catch (error) {
          toast.error('Error in getting Wishlist');

        }
      }

    
    return  <WishlistContext.Provider value={{ addtowishlist,getwishlist,removefromwishlist,wishlistCounter}}>
                {props.children}
            </WishlistContext.Provider>
}