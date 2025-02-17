import React, { Component, useContext, useEffect, useState } from "react";
import { get } from "../../API_Call/Get_Call"; // Replace with the correct relative path
import { jwtDecode } from "jwt-decode";
import { TokenContext } from "../../Context/TokenContext";
import Loader from "../Loader/Loader";

export default function OrderDetails() {
  const [orders, setorders] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  let { Token, setToken } = useContext(TokenContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to handle order click
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  async function getUsers() {
    try {
      const user = jwtDecode(localStorage.getItem("token"));
      console.log(user);
      // Await the result of the GET request
      const message = await get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`
      );
      console.log(message);
      setisLoading(false);
      setorders(message.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            History
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {orders?.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            {new Date(order.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            EGP {order.totalOrderPrice}
                          </p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href="#"
                          onClick={() => handleOrderClick(order)}
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          Order # {order.id}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Trigger (Extra large modal) */}
      {isModalOpen && selectedOrder && (
        <div
          id="extralarge-modal"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center backdrop-blur-md "
        >
          <div className="relative w-full max-w-7xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Order Details
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 p-4">
                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Track the delivery of order #{selectedOrder.id}
                  </h2>

                  <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
                    <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                      {selectedOrder.cartItems.map((item) => (
                        <>
                          <div class="space-y-5 p-6">
                            <div class="flex items-center gap-6">
                              <a href="#" class="h-14 w-14 shrink-0">
                                <img
                                  class="h-full w-full dark:hidden"
                                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                  alt="imac image"
                                />
                                <img
                                  class="hidden h-full w-full dark:block"
                                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                  alt="imac image"
                                />
                              </a>

                              <a
                                href="#"
                                class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                              >
                                {" "}
                                {item.product.title}{" "}
                              </a>
                            </div>

                            <div class="flex items-center justify-between gap-4">
                              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <span class="font-medium text-gray-900 dark:text-white">
                                  Product ID:
                                </span>{" "}
                                {item.product.id}
                              </p>

                              <div class="flex items-center justify-end gap-4">
                                <p class="text-base font-normal text-gray-900 dark:text-white">
                                  x{item.count}
                                </p>

                                <p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                  EGP {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}

                      <div class="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                        <div class="space-y-2">
                          <dl class="flex items-center justify-between gap-4">
                            <dt class="font-normal text-gray-500 dark:text-gray-400">
                              Original price
                            </dt>
                            <dd class="font-medium text-gray-900 dark:text-white">
                              EGP {selectedOrder.totalOrderPrice}
                            </dd>
                          </dl>

                          <dl class="flex items-center justify-between gap-4">
                            <dt class="font-normal text-gray-500 dark:text-gray-400">
                              Savings
                            </dt>
                            <dd class="text-base font-medium text-green-500">
                              -EGP 0.00
                            </dd>
                          </dl>

                          <dl class="flex items-center justify-between gap-4">
                            <dt class="font-normal text-gray-500 dark:text-gray-400">
                              Store Pickup
                            </dt>
                            <dd class="font-medium text-gray-900 dark:text-white">
                              EGP 0
                            </dd>
                          </dl>

                          <dl class="flex items-center justify-between gap-4">
                            <dt class="font-normal text-gray-500 dark:text-gray-400">
                              Tax
                            </dt>
                            <dd class="font-medium text-gray-900 dark:text-white">
                              EGP {selectedOrder.taxPrice}
                            </dd>
                          </dl>
                        </div>

                        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                          <dt class="text-lg font-bold text-gray-900 dark:text-white">
                            Total
                          </dt>
                          <dd class="text-lg font-bold text-gray-900 dark:text-white">
                            EGP {selectedOrder.totalOrderPrice}
                          </dd>
                        </dl>
                      </div>
                    </div>

                    <div class="mt-6 grow sm:mt-8 lg:mt-0">
                      <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Order history
                        </h3>

                        <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                          <li class="mb-10 ms-6">
                            <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                              <svg
                                class="h-4 w-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                                />
                              </svg>
                            </span>
                            <h4 class="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
                              Order time
                            </h4>
                            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {new Date(
                                selectedOrder.createdAt
                              ).toLocaleString()}
                            </p>
                          </li>

                          <li class="mb-10 ms-6">
                            <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                              <svg
                                class="h-4 w-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                />
                              </svg>
                            </span>
                            <h4 class="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
                              Shipping Address
                            </h4>
                            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {selectedOrder.shippingAddress.city}
                            </p>
                          </li>

                          <li className="mb-10 ms-6">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                              <svg
                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
                                  d="M21 20c0 1.104-.896 2-2 2h-2c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v16zM3 6c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H5c-1.104 0-2-.896-2-2V6z"
                                />
                              </svg>
                            </span>
                            <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
                              Phone Number
                            </h4>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {selectedOrder.shippingAddress.phone}
                            </p>
                          </li>

                          <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                            <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                              <svg
                                class="h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 11.917 9.724 16.5 19 7.5"
                                />
                              </svg>
                            </span>
                            <h4 class="mb-0.5 font-semibold">Payment Method</h4>
                            <p class="text-sm">
                              {selectedOrder.paymentMethodType}
                            </p>
                          </li>

                          <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                            <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                              <svg
                                class="h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 11.917 9.724 16.5 19 7.5"
                                />
                              </svg>
                            </span>
                            <h4 class="mb-0.5 text-base font-semibold">
                              {new Date(selectedOrder.paidAt).toLocaleString()}
                            </h4>
                            <p class="text-sm">
                              Products paid with{" "}
                              {selectedOrder.paymentMethodType}
                            </p>
                          </li>

                          <li class="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                            <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                              <svg
                                class="h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 11.917 9.724 16.5 19 7.5"
                                />
                              </svg>
                            </span>
                            <h4 class="mb-0.5 font-semibold">
                              {new Date(selectedOrder.paidAt).toLocaleString()}
                            </h4>
                            <p class="text-sm">
                              Payment accepted - VISA Credit Card
                            </p>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
