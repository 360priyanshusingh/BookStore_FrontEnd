import React, { useEffect, useState } from 'react'
import './BookDetails.scss'
import { useParams } from 'react-router-dom'
import { createOrAddToCartApiCall, createOrAddToWishListApiCall, getAuth, getBookByIdApiCall, getCartApiCall, removeToCartApiCall } from '../../utils/Api'
import { addBookToList, updateQuantityoFBook } from '../../utils/store/booksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addBookToWishList, assingBooksIntoWishList } from '../../utils/store/wishListBooksSlice'
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function BookDetails() {
  const { bookId } = useParams()
  const [book,setBook]=useState()
  const [qunatityToBuy, setQuantityToBuy] = useState()
  const dispatch = useDispatch()
  const redixBooks=useSelector((store)=>store.books.booksList);


  useEffect(()=>{
    getBookByIdApiCall(`books/getAllBookById/${bookId}`)
    .then((result)=>{
      const {data}=result
      setBook(data.data)
      getCartApiCall(`cart/getCartById`)
      .then((result)=>{
        const {data}=result;
        data.data.books.map((newbook)=>{
            if(bookId==newbook.id){
              setQuantityToBuy(newbook.quantity);
            }
      })
      
      })
      .catch((error)=>{
         console.log(error)
      })
    })
    .catch((error)=>{
     console.log(error)
    })

  },[])

  const handleSubmit=async(action)=>{

    if(action==='addTocart'){
      if(!qunatityToBuy){
        dispatch(addBookToList(book));
        setQuantityToBuy(book.quantity);
      }else{
        dispatch(updateQuantityoFBook({id:book.id,quantity:qunatityToBuy+1}));
        setQuantityToBuy(qunatityToBuy+1);
      }

    if(getAuth()!="Bearer null"){
    createOrAddToCartApiCall(`cart/addItem/${bookId}`)
    .then((result)=>{
       const {data}=result;
       console.log(data);       
       data.data.books.map((newbook)=>{
        if(bookId==newbook.id){
          setQuantityToBuy(newbook.quantity);
        }
      })
      
    })
    .catch((error)=>{
     console.log(error);
    })

    }  
    

    }
    if(action==='removeTocart'){
      if(qunatityToBuy==1){
        dispatch(addBookToList(book));
        setQuantityToBuy(book.quantity);
      }else{
        dispatch(updateQuantityoFBook({id:book.id,quantity:qunatityToBuy-1}));
        setQuantityToBuy(qunatityToBuy-1);
      }
      if(getAuth()!="Bearer null"){
        removeToCartApiCall(`cart/removeItem/${bookId}`)
        .then((result)=>{
           const {data}=result;
           console.log(data);       
           data.data.books.map((newbook)=>{
            if(bookId==newbook.id){
              setQuantityToBuy(newbook.quantity);
            }
          })
    
        })
        .catch((error)=>{
         console.log(error);
        })
      }

   

    }
    if(action==='addTowishlist'){
      dispatch(addBookToWishList(book))
    if(getAuth()!="Bearer null"){
     createOrAddToWishListApiCall(`wishList/addItem/${bookId}`)
      .then((result)=>{
        const {data}=result;
        console.log(data);       
         data.data.books.map((newbook)=>{
         if(bookId==newbook.id){
          setQuantityToBuy(newbook.quantity);
          }
      })
      
    })
    .catch((error)=>{
     console.log(error);
    })

    }  
    

    }

    console.log(redixBooks)

  }

  return (
    <div className='Bookdetails-main-container' >
         <div className='left-two-img-main-container'>
             <div className='left-two-img-main-cnt'> 
              <img className='left-img-cnt' src={book?.imgUrl} alt="" />  
             </div>              

             <div className='left-two-img-main-cnt'> 
              <img className='left-img-cnt' src={book?.imgUrl} alt="" />  
             </div>              
          </div>
        <div className='Bookdetails-main-left-container'> 
          <div className='Bookdetails-left-img-main-cnt' >
               <img className='Bookdetails-left-img-cnt' src={book?.imgUrl}  />
          </div>
            <div  className='Bookdetails-left-btn-cnt' > 
              {!qunatityToBuy? <> <button  className='bookdetails-btn-container-cnt-1' onClick={()=>handleSubmit('addTocart')} >ADD TO CARD</button>
                <button className='bookdetails-btn-container-cnt-2'  onClick={()=>handleSubmit('addTowishlist')} >ADD TO WISHLIST</button> </>
              :
              <div className='cart-add-btn-cnt'>
              <div className='cart-round-cnt' onClick={()=>handleSubmit('removeTocart')} > <span>-</span> </div>
              <div className='cart-box-cnt' ><span>{qunatityToBuy}</span> </div>
               <div className='cart-round-cnt' onClick={()=>handleSubmit('addTowishlist')} > <span> + </span> </div>
               </div>

                 }
          
             
             
           </div>
        </div>
        <div className='Bookdetails-main-right-container' > 
          <div className='Bookdetails-main-top-cnt'>
          <span className='Bookdetails-text-cnt-1'>  {book?.bookName} </span>
          <span className='Bookdetails-text-cnt-2' > {book?.author} </span>
          <span className='Bookdetails-text-cnt-3' > ✨[4.5]</span>
          <span className='Bookdetails-text-cnt-4' > Rs {book?.price} </span>
           </div> 
           <div className='book-underline-cnt'> </div>
           <div className='Bookdetails-main-mid-cnt' >
             <span className='Bookdetails-text-cnt-5' >book details </span>
             <span className='Bookdetails-details-text-cnt' > {book?.description} </span>
           </div>
           <div className='book-underline-cnt'> </div>
           <div className='customer-details-container-cnt' >
              <span className='customer-details-heading-cnt'> Customer Feedback  </span> 
              <div className='customer-second-container-cnt' >
                 <span className='inside-heading-cnt' > Overall rating </span>
                 <div className='star-container-cnt'>
                     <StarOutlineIcon/>
                     <StarOutlineIcon/>
                     <StarOutlineIcon/>
                     <StarOutlineIcon/>
                     <StarOutlineIcon/>
           
                   </div>
               
                 <textarea className='input-container-cnt' name="" id="" rows="3"></textarea>
                <div className='button-container-main-cnt'>
                <button className='button-container-cnt'> SUBMIT </button>
                </div>
                
              </div>

           </div>

        </div>

    </div>
  )
}

export default BookDetails