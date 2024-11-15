import React, { useEffect, useState } from 'react'
import { getCartApiCall } from '../../utils/Api';
import './MyOrder.scss'

function MyOrder() {
    const [books,setBooks]=useState()

    useEffect(()=>{
        getCartApiCall(`cart/getCartById`)
        .then((result)=>{
          const {data}=result;
          setBooks(data.data.books) 
        })
        .catch((error)=>{
           console.log(error)
        })

     },[]) 

  return (
    <div className='myorder-main-container-cnt' >
        <div className='whilist-header-container-cnt' >
            <h4>My Order (02) </h4> 
        </div>
          {   books?.map((book)=>(
        <div className='myorder-container-cnt'>
    
            <div className='cart-top-second-cnt' key={book.id} > 
            <img className='cart-img-cnt' src={book.imgUrl} alt="" />
            <div className='cart-main-text-cnt'>
             <span className='cart-text-cnt-1'> {book.bookName}</span>
             <span className='cart-text-cnt-2'> {book.authorName }</span>
             <span className='cart-text-cnt-4'> Rs.. {book.price}</span>
             </div>
        </div>
        <div className='myorder-right-side-container-cnt' > 
            <div className='myorder-raound-cnt'> </div>
            <span className='myorder-text-cnt' >  Order Placed on May 21 </span>
        </div>

        </div>
        )) }
      
    </div>
  )
}

export default MyOrder