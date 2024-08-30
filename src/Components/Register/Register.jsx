import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';



export default function Register() {

  let {userLogin , setuserLogin} = useContext(UserContext);

  const navigate = useNavigate();

const [ApiError, setApiError] = useState("");
const [isLoading, setisLoading] = useState(false);

function handleRegister(values){
  setisLoading(true);
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
  .then((res)=>{
    setisLoading(false);
    if(res.data.message == "success"){
        setisLoading(false);

      
localStorage.setItem("userToken" , res.data.token)
setuserLogin(res.data.token)
navigate("/")      
    }
  })
  .catch((res)=>{
    setisLoading(false);
    setApiError(res.response.data.message);
  })
}

// YUP VALIDATION 
let validationSchema = Yup.object().shape({
  name: Yup.string()
  .min(3 , "minimum length is 3 letters")
  .max(10 , "maximum length is 10 letters")
  .required("name is required"),

  email: Yup.string()
  .email("invalid email")
  .required("email is required"),

  phone: Yup.string()
  .matches(/^01[0125][0-9]{8}$/ , "invalid phone number")
  .required("phone number is required"), 

  password: Yup.string()
  .matches(/^[A-Za-z0-9]{6,12}$/ , "password required from 6 to 12 characters")
  .required("password is required"),

  rePassword: Yup.string()
  .oneOf([Yup.ref("password")] , "repassword doesn't match the password")
  .required("confirm password is required"),
})


// CUSTOM VALIDATION
// function validateForm(values){
// let errors = {};

// if (!values.name){
//   errors.name = "Name is required";
// }
// else if(!/^[A-Z][a-z]{2,9}$/.test(values.name) ){
//   errors.name = "NOT valid name!";
// }


// if (!values.phone){
//   errors.phone = "Phone is required";
// }
// else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
//   errors.phone = "NOT valid phone number";
// }

// return errors;  

// }




let formik = useFormik({

initialValues:{

name:"",
email:"",
phone:"",
password:"",
rePassword:"",

},

validationSchema   //if the data has an err the form wont submit anymore
,   
onSubmit : handleRegister,

});


  return (
    <>
    
    

<div>

{ApiError ? <div className='w-1/2 mx-auto text-white bg-red-500 font-bold rounded-lg p-3'>
  {ApiError}
  </div> : null}

  
  <h1 className='text-center font-bold text-2xl py-7'>Register <i className="fa-regular fa-face-smile-beam"></i></h1>


  <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>


{/* name  */}
     
  <div className="relative z-0 w-full mb-5 group">
      <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.name}
      name="name"
       type="text"
         id="name" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />

      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
     
      {formik.errors.name?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <i className="fa-solid fa-circle-exclamation px-1"></i> {formik.errors.name}
</div> : null}
  </div>


{/* email */}

  <div className="relative z-0 w-full mb-5 group"> 
      <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
      name="email"
       type="email"
         id="email" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />

      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>

      {formik.errors.email && formik.touched.email?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <i className="fa-solid fa-circle-exclamation px-1"></i> {formik.errors.email}
</div> : null}
  </div>
  

{/* phone */}
  <div className="relative z-0 w-full mb-5 group">
      <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.phone}
      name="phone"
       type="tel"
         id="phone" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />

      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>

      {formik.errors.phone && formik.touched.phone ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <i className="fa-solid fa-circle-exclamation px-1"></i> {formik.errors.phone}
</div> : null}
  </div>
  

{/* password */}
  <div className="relative z-0 w-full mb-5 group">
      <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      name="password"
       type="password"
         id="password" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />

      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

      {formik.errors.password && formik.touched.password?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <i className="fa-solid fa-circle-exclamation px-1"></i> {formik.errors.password}
</div> : null}
  </div>
  

{/* rePassword */}
  <div className="relative z-0 w-full mb-5 group">
      <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.rePassword}
      name="rePassword"
       type="password"
         id="rePassword" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />

      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-Password</label>

      {formik.errors.rePassword && formik.touched.rePassword?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <i className="fa-solid fa-circle-exclamation px-1"></i> {formik.errors.rePassword}
</div> : null}
  </div>
  
<div className='flex gap-4 items-center'>

<button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
    </button>


    <Link to={"/login"}><span className='pl-5 underline text-blue-800 hover:text-blue-600 '>Do you have an account? Login</span></Link>
</div>
  

</form>

</div>

    
    
    
    
    
    
    
    
    
    </>
  )
}
