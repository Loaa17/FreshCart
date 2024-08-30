import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';

export default function Checkout() {
  const { checkout, cartId } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    
    onSubmit: () => handleCheckout(cartId, `http://localhost:5173`),
  });

  async function handleCheckout(cartId, url) {
    setLoading(true);
    setError(null);

    try {
      const { data } = await checkout(cartId, url, formik.values);
      window.location.href = data.session.url;
    } catch (error) {
      setError('Checkout failed. Please try again.');
    }
  }

  return (
    <div>
      <h1 className='text-center font-bold text-2xl py-7'>
        Checkout Now <i className='fa-regular fa-face-smile-beam'></i>
      </h1>

      <form className='max-w-md mx-auto' onSubmit={formik.handleSubmit}>
        {/* Details */}
        <div className='relative z-0 w-full mb-5 group'>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            name='details'
            type='text'
            id='details'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='details'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Details
          </label>
         
        </div>

        {/* Phone */}
        <div className='relative z-0 w-full mb-5 group'>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name='phone'
            type='tel'
            id='phone'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='phone'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Phone
          </label>
          
        </div>

        {/* City */}
        <div className='relative z-0 w-full mb-5 group'>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            name='city'
            type='text'
            id='city'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='city'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            City
          </label>
         
        </div>

        <div className='flex gap-4 items-center'>
          <button
            type='submit'
            className='text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            disabled={loading}
          >
          Pay Now
          </button>
        </div>

        {error && <div className='text-red-600 mt-4'>{error}</div>}
      </form>
    </div>
  );
}
