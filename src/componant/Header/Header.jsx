import React, { useEffect, useState } from 'react'
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Header.scss'
import { useNavigate } from 'react-router-dom';
import { assingBooksIntoList, removeBookFromList, updateQuantityoFBook } from '../../utils/store/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createOrAddToCartApiCall, getAuth, getCartApiCall, getUserApiCall, removeToCartApiCall, updateQuantityApiCall } from '../../utils/Api';
import { Modal } from '@mui/material';
import ViewProfile from '../ViewProfile/ViewProfile';
import { assingWordsIntoQuerySearch } from '../../utils/store/querySearch';

function Header() {
   const navigate=useNavigate()
   const books = useSelector((store) => store.books.booksList || []);
   const dispatch=useDispatch()
   const [open,setOpen]=useState(false)
   const [user,setUser]=useState()

   const toggleFuction=()=>{
       setOpen(!open)
   }

   const campairData=(apidata)=>{
    console.log(apidata)
      if(books.length==0){
         dispatch(assingBooksIntoList(apidata))
        return 
      }
      else if(apidata.length==0){
         books.map((book)=>{
          handleSubmit('updateQuantity',book.id,book.quantity)
         })
         return
      }
      else if(books!=null && apidata!=null){
        apidata.map((book)=>{
         let resultBook=books.filter((newBook)=>{ 
          if(newBook.id===book.id){
            if(newBook.quantity!=book.quantity){
              handleSubmit('updateQuantity',book.id,newBook.quantity)
           }
            return newBook
          }
         })
        
        })
      }
       
   }
   
   useEffect(()=>{

    if(getAuth()!="Bearer null"){

      getCartApiCall(`cart/getCartById`)
      .then((result)=>{
        const {data}=result;
        campairData(data.data.books)
      })
      .catch((error)=>{
         console.log(error)
      })

      getUserApiCall(`users/getUser`)
      .then((result)=>{
        const {data}=result;
        console.log(data.data)
        setUser(data.data)
      })
      .catch((error)=>{
         console.log(error)
      })

      
    }

   },[])

   const handleSubmit=async(action,bookId,quantity)=>{

    if(action==='addTocart'){
     dispatch(updateQuantityoFBook({id:bookId,quantity:quantity+1}));
     if(getAuth()!="Bearer null")
    createOrAddToCartApiCall(`cart/addItem/${bookId}`)
    .then((result)=>{
       const {data}=result;
      //  setBooks(data.data.books)
    })
    .catch((error)=>{
     console.log(error);
    })

    }
    if(action==='removeTocart'){
      dispatch(updateQuantityoFBook({id:bookId,quantity:quantity-1}));
      if(getAuth()!="Bearer null"){
        removeToCartApiCall(`cart/removeItem/${bookId}`)
        .then((result)=>{
           const {data}=result;
           console.log(data);       
          //  setBooks(data.data.books)
    
        })
        .catch((error)=>{
         console.log(error);
        })
      }
  
    }
    if(action==='updateQuantity'){
      updateQuantityApiCall(`cart/updateQuantity/${bookId}`,{quantity})
      .then((result)=>{
       const {data}=result;
       console.log(data); 
     })
     .catch((error)=>{
      console.log(error);
     })

    }

    if(action==='removeFromCart'){
      dispatch(removeBookFromList({id:bookId}))
      if(getAuth()!="Bearer null"){
        removeToCartApiCall(`cart/removeItem/${bookId}`)
        .then((result)=>{
         const {data}=result;
         console.log(data); 
       })
       .catch((error)=>{
        console.log(error);
       })  
      }

    }
    // if(action==='createOrder'){
    //   navigate("/order")
    //   if(getAuth()!="Bearer null"){
    //     createOrderApiCall(`order/createOrder/`,{shippingAddress:selectedValue})
    //     .then((result)=>{
    //      const {data}=result;
    //      console.log(data); 
    //    })
    //    .catch((error)=>{
    //     console.log(error);
    //    })  
    //   }

    // }
    // if(action==='createCustomerAddress'){
    //   if(getAuth()!="Bearer null"){
    //     createCustomerDetailsApiCall(`customer/createCustomerDetails/`,{name,mobileNumber,city,state,address})
    //     .then((result)=>{
    //      const {data}=result;
    //      console.log(data); 
    //      setNewAddress(!newAddress)
    //    })
    //    .catch((error)=>{
    //     console.log(error);
    //    })  
    //   }

    // }

    // if(action==='editCustomerAddress'){
    //   if(getAuth()!="Bearer null"){
    //     updateCustomerDetailsApiCall(`customer/updateCustomerDetails/${customerId}`,{name,mobileNumber,city,state,address})
    //     .then((result)=>{
    //      const {data}=result;
    //      console.log(data); 
    //      setNewAddress(!newAddress)
    //    })
    //    .catch((error)=>{
    //     console.log(error);
    //    })  
    //   }

    // }

  }

  return (
    <div className='header-main-container' >  
        <div className='left-header-cnt'> 
         <ImportContactsIcon />
        <span>BookStore</span> 

        </div>
        <div className='mid-header-cnt' >
             <SearchIcon className='header-serch-icon-cnt' />   
             <input className='header-input-icon-cnt' onChange={(e)=>{dispatch(assingWordsIntoQuerySearch(e.target.value))}} placeholder='Search......' />
        </div>
        <div  className='right-header-cnt' >
             <div className='right-header-icon-cnt' onClick={()=>setOpen(!open)} > 
                <AccountCircleOutlinedIcon/> 
                <span> {user ? user.firstName : "Profile" }</span>
              </div>  
             <div className='right-header-icon-cnt' onClick={()=>navigate("/cart")}  >  
                    <ShoppingCartOutlinedIcon/>  
                    <span >  Cart </span>
            </div>
        </div>
        <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"> 
            <ViewProfile toggleFuction={toggleFuction} user={user}  />
           </Modal>
      
    </div>
  )
}

export default Header