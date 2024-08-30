import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function RecentProducts() {
  let { data, isError, isLoading } = useProducts();
  let { addProductCart } = useContext(CartContext);
  let { addProductWishlist, removeProductWishlist } = useContext(WishlistContext);

  const [wishlistProductIds, setWishlistProductIds] = useState(new Set()); // Track wishlist items

  async function addToCart(id) {
    let response = await addProductCart(id);

    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  // Handle adding or removing item from wishlist
  async function toggleWishlistItem(productId) {
    if (wishlistProductIds.has(productId)) {
      let response = await removeProductWishlist(productId);
      if (response.data.status === 'success') {
        setWishlistProductIds(prev => {
          const updatedSet = new Set(prev);
          updatedSet.delete(productId);
          return updatedSet;
        });
        toast.success('Product removed from wishlist');
      } else {
        toast.error('Failed to remove product');
      }
    } else {
      let response = await addProductWishlist(productId);
      if (response.data.status === 'success') {
        setWishlistProductIds(prev => new Set(prev).add(productId));
        toast.success('Product added to wishlist');
      } else {
        toast.error('Failed to add product');
      }
    }
  }

  if (isError) {
    return <h2>Error loading products</h2>;
  }

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {data?.data?.data?.map((product) => (
          <div key={product.id} className='md:w-1/3 lg:w-1/4'>
            <div className="card hover:shadow-emerald-500 m-1 hover:rounded-lg hover:shadow-md">
              <div className="product mb-3">
                <Link to={`productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className='w-full' alt={product.category.name} />
                  <h4 className='mb-1 text-emerald-500'>{product.category.name}</h4>
                  <h3 className='font-semibold mb-4'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className='flex justify-between'>
                    <span>{product.price} EGP</span>
                    <span><i className='fas fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
                  </div>
                </Link>

                {/* Heart icon toggle */}
                <span
                  className={`float-right mr-1 text-lg mt-3 ${wishlistProductIds.has(product.id) ? 'text-red-600' : 'text-black hover:text-red-600'}`}
                  onClick={() => toggleWishlistItem(product.id)}
                >
                  <i className="fa-solid fa-heart"></i>
                </span>

                <button className='btn ml-16 w-3/5' onClick={() => addToCart(product.id)}>+ Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}