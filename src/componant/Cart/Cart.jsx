import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { createCustomerDetailsApiCall, createOrAddToCartApiCall, createOrderApiCall, getAuth, getCartApiCall, getCustomerDetaillsApiCall, removeToCartApiCall, updateCustomerDetailsApiCall, updateQuantityApiCall } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Login from '../Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { assingBooksIntoList, removeBookFromList, updateQuantityoFBook } from '../../utils/store/booksSlice';
import { Radio } from '@mui/material';


export default function Cart() {
    //  const [books,setBooks]=useState([
    //   {
    //     "id": 4,
    //     "price": 2000,
    //     "author": "Library Mindset",
    //     "imgUrl": "https://m.media-amazon.com/images/I/61T7rKzinuL._SY466_.jpg",
    //     "adminId": 1,
    //     "bookName": "The Art of Laziness",
    //     "quantity": 5,
    //     "description": "If the answer is yes, then this book is for you. Laziness stops us from enjoying the little time we have. It doesn't help you accomplish your goals. It stops you from starting anything new. It makes your life miserable.",
    //     "discountPrice": 60
    //   },
    //   {
    //     "id": 2,
    //     "price": 1000,
    //     "author": "Haruki Murakami",
    //     "imgUrl": "https://m.media-amazon.com/images/I/71OUTeaNQBL._SY466_.jpg",
    //     "adminId": 1,
    //     "bookName": "The City and Its Uncertain Walls",
    //     "quantity": 5,
    //     "description": "When a young man’s girlfriend mysteriously vanishes, he sets his heart on finding the imaginary city where her true self lives. His search will lead him to take a job in a remote library with mysteries of its own.",
    //     "discountPrice": 50
    //   }
    // ]);

    //  const [books,setBooks]=useSelector((store)=>store.books.booksList);
     const [showAddress,setShowAddress]=useState(false)
     const [showCoustomerAddress,setShowCoustomerAddress]=useState(false)
     const [showOderSummary,setShowOderSummary]=useState(false)
     const  navigate=useNavigate()
     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     const books = useSelector((store) => store.books.booksList || []);
     const dispatch=useDispatch()
    const [customerDetailsList,setCustomerDetailsList]=useState([])
    const [selectedValue, setSelectedValue] = useState(1);
    const [name,setName]=useState()
    const [customerId,setcustomerId]=useState()
    const [mobileNumber,setMobileNumber]=useState()
    const [address,setAddress]=useState()
    const [city,setCity]=useState()
    const [state,setState]=useState()
    const [newAddress,setNewAddress]=useState(true)


    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    
    //  console.log(redixBooks)
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
        
        getCustomerDetaillsApiCall(`customer/getCustomerDetails`)
        .then((result)=>{
          const {data}=result;
          setCustomerDetailsList(data.data)
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
        if(action==='createOrder'){
          navigate("/order")
          if(getAuth()!="Bearer null"){
            createOrderApiCall(`order/createOrder/`,{shippingAddress:selectedValue})
            .then((result)=>{
             const {data}=result;
             console.log(data); 
           })
           .catch((error)=>{
            console.log(error);
           })  
          }

        }
        if(action==='createCustomerAddress'){
          if(getAuth()!="Bearer null"){
            createCustomerDetailsApiCall(`customer/createCustomerDetails/`,{name,mobileNumber,city,state,address})
            .then((result)=>{
             const {data}=result;
             console.log(data); 
             setNewAddress(!newAddress)
           })
           .catch((error)=>{
            console.log(error);
           })  
          }

        }
    
        if(action==='editCustomerAddress'){
          if(getAuth()!="Bearer null"){
            updateCustomerDetailsApiCall(`customer/updateCustomerDetails/${customerId}`,{name,mobileNumber,city,state,address})
            .then((result)=>{
             const {data}=result;
             console.log(data); 
             setNewAddress(!newAddress)
           })
           .catch((error)=>{
            console.log(error);
           })  
          }

        }
    
      }

      const checkUserLoginOrNot=()=>{
        console.log(getAuth())
        if(getAuth()=="Bearer null"){
          handleOpen()
        }
        else{
          setShowCoustomerAddress(!showCoustomerAddress)
        }
      }
    

   const setEditFuction = (customer)=>{
       setcustomerId(customer.id)
       setName(customer.name)
       setAddress(customer.address)
       setCity(customer.city)
       setMobileNumber(customer.mobileNumber)
       setState(customer.state)
       setNewAddress(!newAddress)
       setShowAddress(!showAddress)
   }


  return (
    <div className='cart-main-container-cnt' >
            <div className='cart-top-main-cnt' >
              <div className='cart-top-cnt'> 
              <div className='cart-top-heading-cnt' ><span>My Cart (0)</span> </div>
              <div className='cart-top-select-cnt' > 
                <select >
                 <option value="">Use Current Location</option>          
                 <option value="">Use Current Location</option>          
               </select> 
              </div>
 
             </div>
             {books?.map((book)=>(
                  <div className='cart-top-second-cnt' key={book.id} > 
                  <img className='cart-img-cnt' src={book.imgUrl} alt="" />
                  <div className='cart-main-text-cnt'>
                   <span className='cart-text-cnt-1'> {book.bookName}</span>
                   <span className='cart-text-cnt-2'> {book.authorName }</span>
                   <span className='cart-text-cnt-4'> Rs.. {book.price}</span>
                   <div className='cart-add-btn-cnt'>
                        <div className='cart-round-cnt'onClick={()=>handleSubmit('removeTocart',book.id,book.quantity?book.quantity:book.qty)} > <span>-</span> </div>
                        <div className='cart-box-cnt' ><span>{book.quantity?book.quantity:book.qty}</span> </div>
                         <div className='cart-round-cnt' onClick={()=>handleSubmit('addTocart',book.id,book.quantity?book.quantity:book.qty)} > <span>+</span> </div>
                         <div className='cart-remove-btn-cnt'  onClick={()=>handleSubmit('removeFromCart',book.id,book.quantity?book.quantity:book.qty)} > Remove </div>
                   </div>
                   </div>
              </div>
             ))}
            {!showCoustomerAddress &&
               <div className='cart-main-btn-cnt' >
               <button className='cart-oder-btn-cnt' onClick={()=>{checkUserLoginOrNot()}} > PLACE ORDER </button>
             </div>
            }
        
            </div>
         
           <div className='cart-mid-main-cnt' >
              {!showCoustomerAddress?<span className='cart-mid-heading-cnt' > Address Details  </span>
              : 
              <div>  
                    <div className='customer-heading-cnt' > 
                        <span className='cart-mid-heading-cnt' > Customer Detaills </span>
                        <span className='cart-mid-box-heading-cnt' onClick={()=>setNewAddress(!newAddress)}  > Add New Address </span>
                    </div>
                    { newAddress ? <>{
                     customerDetailsList.map((customer)=>(
                        <> <div className='customer-name-main-container'>
                            <Radio
                    className='add-home-edit-cnt'
                    checked={selectedValue == customer.id}
                    onChange={handleChange}
                    value={customer.id}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                        <div className='customer-name-cnt'>
                            <span className='cart-text-cnt-1' >Name</span>
                            <span className='cart-text-cnt-3' > {customer.name} </span>
                        </div>
                        <div className='customer-name-cnt'>
                            <span className='cart-text-cnt-1' >Mobile Number</span>
                            <span className='cart-text-cnt-3'  >  {customer.mobileNumber}  </span>
                        </div>
                    </div>
                    {showAddress?
                    <div className='customer-address-main-container'>
                    <h4 className='cart-text-cnt-1'>Work</h4>
                   <span className='cart-text-cnt-1' > Address </span>
                   <textarea className='cart-address-heading-cnt' value={customer.address} />  
                   <div className='customer-name-main-container-2-cnt'>
                       <div className='customer-name-cnt-2'>
                           <span className='cart-text-cnt-1' >City/Town</span>
                           <input className='cart-text-cnt-3' value={customer.city} />
                       </div>
                       <div className='customer-name-cnt-2'>
                           <span className='cart-text-cnt-1' >State</span>
                           <input className='cart-text-cnt-3' value={customer.state} />
                       </div>
                   </div>
                   </div> 
                   :
                   <div className='customer-address-main-container'>
                   <div className='address-home-cnt' > <h4 className='cart-text-cnt-1'> Home</h4>
                   {!showAddress ? <> <span className='add-home-edit-cnt' onClick={()=>{setEditFuction(customer)}} > Edit </span> 
                  
                  </> 
                   : <span className='add-home-edit-cnt' onClick={()=>{setShowAddress(!showAddress)}}> </span> } </div> 
                  
                   
                  <span className='cart-text-cnt-1' > Address </span>
                  <span className='cart-address-heading-cnt' > {customer.address}</span>
                  </div>}
                        </>
                      )) 
                    }
                    </>
                     :
                  <> <div className='customer-name-main-container'>
                  <div className='customer-name-cnt'>
                      <span className='cart-text-cnt-1' >Name</span>
                      <input className='cart-text-cnt-3' value={name} onChange={(e)=>{setName(e.target.value)}} />
                  </div>
                  <div className='customer-name-cnt'>
                      <span className='cart-text-cnt-1' >Mobile Number</span>
                      <input className='cart-text-cnt-3' value={mobileNumber} onChange={(e)=>{setMobileNumber(e.target.value)}} />
                  </div>
              </div>
             
              <div className='customer-address-main-container' style={{paddingLeft:newAddress?"82px":"40px"}} >
              <h4 className='cart-text-cnt-1'>Work</h4>
             <span className='cart-text-cnt-1' > Address </span>
             <textarea className='cart-address-heading-cnt' value={address} onChange={(e)=>{setAddress(e.target.value)}} />  
             <div className='customer-name-main-container-2-cnt'>
                 <div className='customer-name-cnt-2'>
                     <span className='cart-text-cnt-1' >City/Town</span>
                     <input className='cart-text-cnt-3' value={city} onChange={(e)=>{setCity(e.target.value)}} />
                 </div>
                 <div className='customer-name-cnt-2'>
                     <span className='cart-text-cnt-1' >State</span>
                     <input className='cart-text-cnt-3' value={state} onChange={(e)=>{setState(e.target.value)}} />
                 </div>
             </div>
             </div> 
                  </>
                    }
                    
                    
                   {!showOderSummary && 
                    <div className='cart-main-btn-cnt' >
                      {newAddress ? <button className='cart-oder-btn-cnt' onClick={()=>setShowOderSummary(!showOderSummary)} > COUNTINUE </button>
                      :<button className='cart-oder-btn-cnt' onClick={()=>{ showAddress? handleSubmit("editCustomerAddress"):handleSubmit("createCustomerAddress")}} > SUBMIT </button> }
                    
                    </div>
                     }
                 
                   
               </div>
                }
               
                
           </div>

           <div className='cart-mid-main-cnt' >
           {/* */}
           {!showOderSummary ? <span className='cart-mid-heading-cnt' > Order Summary </span> 
           : books?.map((book)=>(
            <div className='cart-top-second-cnt' key={book.id} > 
            <img className='cart-img-cnt' src={book.imgUrl} alt="" />
            <div className='cart-main-text-cnt'>
             <span className='cart-text-cnt-1'> {book.bookName}</span>
             <span className='cart-text-cnt-2'> {book.authorName }</span>
             <span className='cart-text-cnt-4'> Rs.. {book.price}</span>
             </div>
        </div>
       ))}
            <div className='cart-main-btn-cnt' >
               <button className='cart-oder-btn-cnt' onClick={()=>handleSubmit('createOrder')} > CHECKOUT </button>
             </div>

           </div>
           
           <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"> 
         
          <Login container={'cart'}  handleCloseModal={handleClose} campairData={campairData} />
      

           </Modal>

    </div>
  )
}
