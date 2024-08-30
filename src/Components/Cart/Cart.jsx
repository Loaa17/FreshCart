import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import useProducts from '../../Hooks/useProducts';
import { Link } from 'react-router-dom';




export default function Cart() {
  let {getLoggedUserCart , updateProductQuantity , deleteCartItem , deleteCart} = useContext(CartContext);

  const [cartDetails, setcartDetails] = useState(null)

  let { isLoading } = useProducts()


async function getCartItems(){
  let response = await getLoggedUserCart()
  if(response.data.status == "success"){
    setcartDetails(response.data.data);
  }
}

async function updateProduct(id , count){
  let response = await updateProductQuantity(id , count)

if(response.data.status == "success"){
  setcartDetails(response.data.data); 
  toast.success("Cart updated successfully");
}else{

  toast.error("Failed to update Cart");
}


  
}

async function deleteItem(productId){
  let response = await deleteCartItem(productId);
  if(response.data.status == "success"){
    setcartDetails(response.data.data); 
    toast.success("Product removed successfully");
  }  else{
    toast.error("Failed to remove product");
  }
  
}


async function deleteAll(){
  let response = await deleteCart()

  if(response.data.message == "success"){

    setcartDetails(null);
    toast.success("Cart cleared successfully");
  }else{
    toast.error("Failed to clear cart");
  }
  
}



useEffect(()=>{
  getCartItems()
} , [])


if (isLoading){
  return (
  <>
  <div className="spinner">
  <div className="double-bounce1"></div>
  <div className="double-bounce2"></div>
</div>
  </>
  )
}else{

  return (
    <>
   
   {cartDetails?.products.length > 0 ? <>
   <h1 className='text-center text-emerald-500 text-5xl py-7'><i className="fa-solid fa-cart-shopping"></i> Cart</h1>
   
   <h2 className='underline text-emerald-700 text-2xl font-bold my-2'><i className="fa-solid fa-coins"></i> Total Price = {cartDetails?.totalCartPrice} EGP</h2>
   
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
         <tr>
           <th scope="col" className="px-16 py-3">
             <span className="sr-only">Image</span>
           </th>
           <th scope="col" className="px-6 py-3">
             Product
           </th>
           <th scope="col" className="px-6 py-3">
             Qty
           </th>
           <th scope="col" className="px-6 py-3">
             Price
           </th>
           <th scope="col" className="px-6 py-3">
             Action
           </th>
         </tr>
       </thead>
       <tbody>
   
   {cartDetails?.products.map((product)=>  <tr key={product.product.id} className="bg-white border-b  hover:bg-gray-50 ">
           <td className="p-4">
             <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
           </td>
           <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
   {product.product.category.name} 
           </td>
           <td className="px-6 py-4">
             <div className="flex items-center">
               <button
               onClick={()=>updateProduct(product.product.id , product.count - 1)}
                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                 <span className="sr-only">Quantity button</span>
                 <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 18 2">
                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                 </svg>
               </button>
               <div>
                 <span>{product.count}</span>
               </div>
               <button
                           onClick={()=>updateProduct(product.product.id , product.count + 1)}
   
               className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                 <span className="sr-only">Quantity button</span>
                 <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 18 18">
                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                 </svg>
               </button>
             </div>
           </td>
           <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
             {product.price * product.count} EGP
           </td>
           <td className="px-6 py-4">
             <span onClick={()=>deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"><i className="fa-solid fa-trash-can"></i> Remove</span>
           </td>
         </tr>)}
        
       </tbody>


     </table>

   </div>
<Link to={"/checkout"}>
<button  className='border-emerald-500 bg-emerald-500 border-2 p-3 my-5 w-1/2 mx-32 rounded-md text-slate-50 text-lg hover:bg-slate-50 hover:text-slate-950 '>Check Out</button>
</Link>
   
<button onClick={()=>deleteAll(cartDetails.products)} className='border-red-500 bg-slate-50 border-2 text-gray-700 p-3 my-5 rounded-md text-lg hover:bg-red-500 hover:text-slate-50'>Clear Cart <i className="fa-solid fa-trash-can"></i></button>



   </> : <h2 className='text-emerald-600 text-3xl font-bold flex justify-center items-center text-center my-20 mx-auto'>There's No Products in Your Cart<i className="fa-regular fa-face-sad-tear px-2 my-3"></i></h2>}
   
   
    
    </>
     )

}

 
}
