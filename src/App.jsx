import Home from "./Components/Home/Home";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import NotFound from "./Components/Auth/NotFound/NotFound";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./Components/Auth/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import Allorders from "./Components/AllOrders/Allorders";
import Checkout from "./Components/Checkout/Checkout";
import Wishlist from "./Components/Wishlist/Wishlist";
import ForgetPassword from "./Components/Auth/ForgetPassword/ForgetPassword";
import OtpVerify from "./Components/Auth/OTPVerify/OtpVerify";
import ResetPassword from "./Components/Auth/ResetPassword/ResetPassword";
import OrderDetails from "./Components/OrderDetails/OrderDetails";

function App() {
  const queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "/product-details/:id/:category_name",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout/:id",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/history",
          element: (
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/forget-password",
          element: (
            <ProtectedAuth>
              <ForgetPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "/otp-verify",
          element: (
            <ProtectedAuth>
              <OtpVerify />
            </ProtectedAuth>
          ),
        },
        {
          path: "/reset",
          element: (
            <ProtectedAuth>
              <ResetPassword />
            </ProtectedAuth>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
      />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
