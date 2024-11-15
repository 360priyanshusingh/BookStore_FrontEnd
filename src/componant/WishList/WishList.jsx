import React, { useEffect, useState } from 'react'
import { getAuth, getCartApiCall, getWishListApiCall, removeToWishlistApiCall } from '../../utils/Api';
import './WishList.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { assingBooksIntoWishList, removeBookFromWishList } from '../../utils/store/wishListBooksSlice';

function WishList() {
  
  let books = useSelector((store) => store.wishListBooks.wishListBooksList || [] ) ;
  const dispatch=useDispatch() 
  console.log(books)
    useEffect(()=>{
      if(getAuth()!="Bearer null"){
        getWishListApiCall(`wishList/getWishList`)
        .then((result)=>{
          const {data}=result;
          console.log(data)
          dispatch(assingBooksIntoWishList(data.data.books))

        })
        .catch((error)=>{
           console.log(error)
        })
      }
     },[]) 

      
     

    const updateList=(action,bookId)=>{
      if(action==='removeFromWishList'){
        dispatch(removeBookFromWishList({id:bookId}))
        if(getAuth()!="Bearer null"){
          removeToWishlistApiCall(`wishList/deleteWishList/${bookId}`)
          .then((result)=>{
           const {data}=result;
           console.log(data); 
         })
         .catch((error)=>{
          console.log(error);
         })  
        }

      }
       
    } 


  return (
    <div className='myorder-main-container-cnt' >
        <div className='whilist-header-container-cnt' >
            <h4>My Wishlist ({books.length} itmes) </h4> 
        </div>
          {books?.map((book)=>(
        <div className='myorder-container-cnt' key={book.id} >
            <div className='cart-top-second-cnt' key={book?.id} > 
            <img className='cart-img-cnt' src={book?.imgUrl} alt="" />
            <div className='cart-main-text-cnt'>
             <span className='cart-text-cnt-1'> {book?.bookName}</span>
             <span className='cart-text-cnt-2'> {book?.authorName }</span>
             <span className='cart-text-cnt-4'> Rs.. {book?.price}</span>
             </div>
             
        </div>
        <div className='myorder-right-side-container-cnt' > 
            <div className="WishList-delete-icon" >
                <DeleteIcon onClick={()=>{updateList('removeFromWishList',book.id)}} />
            </div>  
        </div>

        </div>
        )) }
      
    </div>
  )

}

export default WishList;