import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';


export default function Wishlist() {
  let { getLoggedUserWishlist, deleteWishlistItem } = useContext(WishlistContext);



  const [wishlistDetails, setWishlistDetails] = useState(null);

  let {addProductCart} = useContext(CartContext);

  async function getWishlistItems() {
    try {
      let response = await getLoggedUserWishlist();
      if (response.data.status === "success") {
        const wishlistData = response.data.data;
        setWishlistDetails(wishlistData);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist items:', error);
      toast.error('Failed to load wishlist items');
    }
  }

  async function deleteItem(productId) {
    try {
      let response = await deleteWishlistItem(productId);
      if (response.data.status === 'success') {
        const updatedWishlistData = response.data.data;
        setWishlistDetails(updatedWishlistData);
        toast.success('Product removed successfully');
      } else {
        toast.error('Failed to remove product');
      }
    } catch (error) {
      console.error('Failed to remove product:', error);
      toast.error('Failed to remove product');
    }
  }

  async function addToCart(id){
    let response = await addProductCart(id);
   
    if(response.data.status == "success"){
   
     toast.success(response.data.message);  
   
    }
    else{
     toast.error(response.data.message);  
   
    }
   }

  useEffect(() => {
    getWishlistItems();
  }, []);

  return (
    <>
      {wishlistDetails?.length > 0 ? (
        <>
          <h1 className='text-center text-emerald-500 text-4xl py-7'>
          Your Wishlist <i className='fa-solid fa-heart'></i> 
          </h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
            {wishlistDetails.map((item) => (
              <div key={item.id} className='border p-4 rounded-lg shadow-lg bg-white'>
                <img
                  src={item.imageCover}
                  className='w-full h-48 object-cover rounded-md mb-4'
                  alt={item.name}
                />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {item.name}
                </h3>
                <p className='text-lg text-gray-700 mb-4'>
                  {item.price} EGP
                </p>
                <button
                  onClick={() => addToCart(item.id)}
                  className='bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600'
                >
                  <i className="fa-solid fa-cart-shopping"></i> Add

                  
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className='bg-red-500 text-white px-4 py-2 rounded-md mx-2 hover:bg-red-600'
                >
                  <i className='fa-solid fa-trash-can'></i> Remove
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className='text-emerald-600 text-3xl font-bold flex justify-center items-center text-center my-20 mx-auto'>
          There's No Products in Your Wishlist
          <i className='fa-regular fa-face-sad-tear px-2 my-3'></i>
        </h2>
      )}
    </>
  );
}