import axios from "axios"
const BASE_URL=`http://localhost:4000/api/v1/`;

export const getAuth =()=>{
    return `Bearer ${localStorage.getItem('token')}`
}

export const signupApiCall = async(END_POINT,payload)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const loginApiCall = async(END_POINT,payload)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const createOrAddToCartApiCall = async(END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,{},
        { 
            headers:{
                  Authorization:getAuth()
             }
         }
    )
}

export const createOrAddToWishListApiCall = async(END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,{},
        { 
            headers:{
                  Authorization:getAuth()
             }
         }
    )
}

export const createOrderApiCall = async(END_POINT,payload)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload,
        { 
            headers:{
                  Authorization:getAuth()
             }
         }
    )
}

export const createCustomerDetailsApiCall = async(END_POINT,payload)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload,
        { 
            headers:{
                  Authorization:getAuth()
             }
         }
    )
}

export const updateQuantityApiCall = async(END_POINT,payload)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload,
        { 
            headers:{
                  Authorization:getAuth()
             }
        }
    )
}

export const updateUserApiCall = async(END_POINT,payload)=>{
    return await axios.put(`${BASE_URL}${END_POINT}`,payload,
        { 
            headers:{
                  Authorization:getAuth()
             }
        }
    )
}

export const updateCustomerDetailsApiCall = async(END_POINT,payload)=>{
    return await axios.put(`${BASE_URL}${END_POINT}`,payload,
        { 
            headers:{
                  Authorization:getAuth()
             }
        }
    )
}


export const removeToCartApiCall = async(END_POINT)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,{},
        { 
            headers:{
               Authorization:getAuth()
             }
        }
    )
}

export const removeToWishlistApiCall = async(END_POINT)=>{
    return await axios.delete(`${BASE_URL}${END_POINT}`,
        { 
            headers:{
               Authorization:getAuth()
             }
        }
    )
}

export const getBookApiCall = async(END_POINT) => {
    return await axios.get(`${BASE_URL}${END_POINT}`)
}

export const getCartApiCall = async(END_POINT) => {
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { 
            headers:{
            Authorization:getAuth()
             }
         }
    )
}
export const getUserApiCall = async(END_POINT) => {
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { 
            headers:{
            Authorization:getAuth()
             }
         }
    )
}

export const getWishListApiCall = async(END_POINT) => {
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { 
            headers:{
            Authorization:getAuth()
             }
         }
    )
}

export const getCustomerDetaillsApiCall = async(END_POINT) => {
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { 
            headers:{
            Authorization:getAuth()
             }
         }
    )
}

export const getBookByIdApiCall = async(END_POINT) => {
    return await axios.get(`${BASE_URL}${END_POINT}`)
}

export const getOrderApiCall = async(END_POINT) => {
    return await axios.get(`${BASE_URL}${END_POINT}`,
        { 
            headers:{
               Authorization:getAuth()
             }
        }
    )
}
