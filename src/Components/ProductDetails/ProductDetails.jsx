import { useQuery } from "@tanstack/react-query";
import React, { Component, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../API_Call/Get_Call"; // Replace with the correct relative path
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import style from "../Products/Product.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  let { addtocart } = useContext(CartContext);
  let { addtowishlist } = useContext(WishlistContext);

  const [relatedProducts, setrelatedProducts] = useState([]);
  const [isRetreiving, setisRetreiving] = useState(true);
  const params = useParams();

  async function addproduct_to_cart(productid) {
    let response = await addtocart(productid);
  }

  async function addproduct_to_wishlist(productid) {
    let response = await addtowishlist(productid);
  }
  // Function to fetch product details
  async function getProductDetails() {
    try {
      const message = await get(
        `https://ecommerce.routemisr.com/api/v1/products/${params.id}`
      );
      return message?.data?.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts() {
    try {
      // Await the result of the GET request
      const message = await get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      let relatedProducts = message?.data?.data;
      relatedProducts = relatedProducts.filter(
        (product) => (product.category.name = params.category_name)
      );
      setrelatedProducts(relatedProducts);
      setisRetreiving(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRelatedProducts();
  }, []);
  // Fetching product details with react-query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Fetch_product_details"],
    queryFn: getProductDetails,
    refetchInterval: 3000,
  });

  // Loading and error states
  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  var settings = {
    dots: true, // Display navigation dots
    infinite: true, // Infinite loop mode
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay for automatic scrolling
    autoplaySpeed: 3000, // Delay between slides in ms
    arrows: true, // Show previous/next arrows
    centerMode: false, // Center the active slide
    adaptiveHeight: true, // Adjust height based on content
    pauseOnHover: true, // Pause autoplay on hover
    responsive: [
      // Make carousel responsive for different screen sizes
      {
        breakpoint: 1024, // For tablets and large devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true, // Enable dots on mobile
        },
      },
    ],
  };

  // JSX to render product details
  return (
    <section className="py-8 md:py-16 ntialiased mt-10">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <div>
              <Slider {...settings} className="w-[350px] h-[450-px]">
                {data.images?.map((image, index) => {
                  return (
                    <>
                      <div>
                        <img
                          key={index}
                          className="w-full dark:hidden w-[350px] h-[450-px]"
                          src={image}
                          alt={`Product Image ${index + 1}`}
                        />
                      </div>
                    </>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {data.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                EGP {data.price}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({data.ratingsAverage})
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {data.ratingsQuantity} Reviews
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                onClick={() => addproduct_to_wishlist(data._id)}
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to Wish list
              </a>

              <a
                href="#"
                title=""
                className="text-white mt-4 sm:mt-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 flex items-center justify-center"
                role="button"
                onClick={() => addproduct_to_cart(data._id)}
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {data.description}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <h1
          className={`${style.green} text-center text-3xl font-extrabold mb-5 mt-20`}
        >
          Related Products
        </h1>
        {isRetreiving ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center items-center">
            {relatedProducts.map((product) => (
              <>
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
                      <button className="text-gray-500 hover:text-red-600">
                        {/* Heart icon for wishlist */}
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
                        className={`${style.cartbtn} text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
