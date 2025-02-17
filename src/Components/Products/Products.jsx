import React, { Component, useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
import style from "./Product.module.css";
import { get } from "../../API_Call/Get_Call"; // Replace with the correct relative path
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export const Products = () => {
  let { addtocart } = useContext(CartContext);
  let { addtowishlist } = useContext(WishlistContext);
  let { Token, setToken } = useContext(TokenContext);
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Update filtered products when the search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  async function addproduct_to_cart(productid) {
    let response = await addtocart(productid);
  }

  async function addproduct_to_wishlist(productid) {
    let response = await addtowishlist(productid);
  }

  async function getProducts() {
    try {
      const message = await get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setisLoading(false);
      setproducts(message.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <form className="flex items-center max-w-lg mx-auto mt-20">
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search Mockups, Logos, Design Templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the searchQuery state
            required
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
              />
            </svg>
          </button>
        </div>
      </form>

      <div className="container mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center items-center">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`${style.card} m-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_0_0_4px_#4CAF50]`}
              >
                <Link
                  to={`/product-details/${product._id}/${product.category.name}`}
                >
                  <a href="#" className="flex justify-center items-center">
                    <img
                      className="p-8 rounded-t-lg w-[200px] h-[250px]"
                      src={product.imageCover}
                      alt="product image"
                    />
                  </a>
                </Link>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                      {product.title.length > 30
                        ? product.title.slice(
                            0,
                            product.title.lastIndexOf(" ", 30)
                          ) + "..."
                        : product.title}
                    </h5>
                  </a>
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => addproduct_to_wishlist(product._id)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>

                    <div className="flex items-center space-x-1 rtl:space-x-reverse ml-auto">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-green-200 dark:text-green-800 ms-3">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      EGP {product.price}
                    </span>
                    <button
                      onClick={() => addproduct_to_cart(product._id)}
                      className={`${style.cartbtn} text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
