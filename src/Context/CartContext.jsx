import { createContext, useEffect, useState } from "react";
import { post } from "../API_Call/Post_Call";
import toast from "react-hot-toast";
import { get } from "../API_Call/Get_Call";
import { _delete } from "../API_Call/Delete_call";
import { update } from "../API_Call/Update_Call";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const initialCartCounter = localStorage.getItem("cartCounter") || 0;
  const [cartCounter, setcartCounter] = useState(Number(initialCartCounter));
  useEffect(() => {
    // Sync cartCounter with localStorage whenever it changes
    localStorage.setItem("cartCounter", cartCounter);
  }, [cartCounter]);

  async function addtocart(productid) {
    try {
      // Await the result of the GET request
      let body = { productId: productid };
      let headers = {
        token: localStorage.getItem("token"),
      };
      console.log(body);
      const message = await post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        body,
        {
          headers: headers,
        }
      );
      if (message.status == 200) {
        toast.success(message?.data?.message);
        setcartCounter(message?.data?.numOfCartItems);
      } else {
        toast.error(message?.data?.message);
      }
      return message;
    } catch (error) {
      console.log(error);
      toast.error("Error in adding to cart");
    }
  }

  async function getcart() {
    try {
      // Await the result of the GET request
      let headers = {
        token: localStorage.getItem("token"),
      };
      const message = await get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      });
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
      toast.error("Error in getting cart");
    }
  }

  async function removefromcart(productid) {
    try {
      // Await the result of the GET request
      let headers = {
        token: localStorage.getItem("token"),
      };
      const message = await _delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        {
          headers: headers,
        }
      );
      console.log(message);
      setcartCounter(message?.data?.numOfCartItems);

      // if(message.status == 200)
      // {
      //     toast.success(message?.data?.message);
      // }
      // else {
      //     toast.error(message?.data?.message);
      // }
      return message?.data;
    } catch (error) {
      toast.error("Error in getting cart");
    }
  }

  async function updateCart(productid, count) {
    try {
      // Await the result of the GET request
      let body = { count: count };
      let headers = {
        token: localStorage.getItem("token"),
      };
      const message = await update(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        body,
        {
          headers: headers,
        }
      );
      console.log(message);
      if (message.status == 200) {
        toast.success(message?.data?.status);
        setcartCounter(message?.data?.numOfCartItems);
      } else {
        toast.error(message?.data?.message);
      }
      return message;
    } catch (error) {
      console.log(error);
      toast.error("Error in adding to cart");
    }
  }

  async function clearcart() {
    try {
      // Await the result of the GET request
      let headers = {
        token: localStorage.getItem("token"),
      };
      const message = await _delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: headers,
        }
      );
      console.log(message);
      setcartCounter(message?.data?.numOfCartItems);

      // if(message.status == 200)
      // {
      //     toast.success(message?.data?.message);
      // }
      // else {
      //     toast.error(message?.data?.message);
      // }
      return message?.data;
    } catch (error) {
      toast.error("Error in getting cart");
    }
  }

  async function onlinepay(cartid, objectbody) {
    try {
      // Await the result of the GET request
      let body = { shippingAddress: objectbody };
      let headers = {
        token: localStorage.getItem("token"),
      };
      console.log(body);
      const message = await post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`,
        body,
        {
          headers: headers,
        }
      );
      // if(message.status == 200)
      // {
      //     // toast.success(message?.data?.message);
      // }
      // else {
      //     toast.error(message?.data?.message);
      // }
      console.log(message);
      return message;
    } catch (error) {
      console.log(error);
      toast.error("Error in adding to cart");
    }
  }

  return (
    <CartContext.Provider
      value={{
        addtocart,
        getcart,
        removefromcart,
        updateCart,
        clearcart,
        onlinepay,
        cartCounter,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
