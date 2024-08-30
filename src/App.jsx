
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import { useState } from "react";
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Wishlist from './Components/Wishlist/Wishlist';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import WishlistContextProvider from './Context/WishlistContext';
import ForgetPass from './Components/ForgetPass/ForgetPass';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';







let query = new QueryClient(); 




let x = createBrowserRouter([

{path:"" , element:<Layout/> , children:[

{index:true, element:<ProtectedRoute> <Home/> </ProtectedRoute>},
{path:"home", element:<ProtectedRoute> <Home/> </ProtectedRoute>},
{path:"cart" , element: <ProtectedRoute>  <Cart/>  </ProtectedRoute>},
{path:"wishlist" , element: <ProtectedRoute>  <Wishlist/>  </ProtectedRoute>},
{path:"products" , element:<ProtectedRoute> <Products/> </ProtectedRoute>},
{path:"categories" , element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
{path:"brands" , element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
{path:"productdetails/:id/:category" , element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
{path:"login" , element:<Login />},
{path:"register" , element:<Register />},
{path:"forgetpass" , element:<ForgetPass />},
{path:"checkout" , element:<Checkout/>},
{path:"allorders" , element:<AllOrders/>},
{path:"*" , element:<NotFound/>},


]},

])
function App() {
  
const [count , setCount]=useState(0)
  return <>
  <UserContextProvider>
  <CounterContextProvider>
    <QueryClientProvider client={query}>
      <CartContextProvider>

<WishlistContextProvider>
<RouterProvider router={x}></RouterProvider>

</WishlistContextProvider>

      <Toaster/>
      </CartContextProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  </CounterContextProvider>
  </UserContextProvider>
  </>
  

  
  
}

export default App
