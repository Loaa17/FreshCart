import axios from "axios";
import { createContext } from "react";



export let WishlistContext = createContext();


export default function WishlistContextProvider(props){

let headers = {
    token : localStorage.getItem("userToken"),

}

function addProductWishlist(productId){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {productId:productId} , {headers} )

.then((res)=>res).catch((err)=>err);

}

function getLoggedUserWishlist(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
    .then((res)=>res).catch((err)=>err);
}



 function deleteWishlistItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {headers} )
    .then((res)=>res).catch((err)=>err);

 }


   

return <WishlistContext.Provider value={  { addProductWishlist , getLoggedUserWishlist , deleteWishlistItem }  }>

{props.children}


</WishlistContext.Provider>

}


