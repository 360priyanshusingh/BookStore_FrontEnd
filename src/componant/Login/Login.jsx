import React, { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { getCartApiCall, loginApiCall, signupApiCall } from '../../utils/Api'
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';
import logo from "../../asset/2766594.png"

export default function Login(props) {
    const {container,handleCloseModal,campairData}=props
    const [open, setOpen]= useState(false)
    const [message, setMessage]= useState()
    const [email, setEmail]= useState()
    const [password,setPassword]= useState()
    const [firstName,setFirstName]= useState()
    const [lastName,setLastName]= useState()
    const [condition,setCondition]=useState('login')

    const navigate=useNavigate()
    const conditionChange=(action)=>{
       if(action!==condition){
        setCondition(action)
       }
    }
 
    const handleSubmit= async(action)=>{
      
      if(action==="login"){
        
      if(!email) {
        setOpen(!open)
        setMessage("Email is requred!")
        return
       }
       if(!password){
        setOpen(!open)
        setMessage("Password is required !")
        return
       }
  
     loginApiCall(`users/login`,{email,password})
     .then((result)=>{
      console.log(result);
  
      const {data} =result
  
      console.log(data);
         if(data.message==="User successfully Login"){
          setOpen(!open)
          setMessage("User successfully Login")
          localStorage.setItem('token',data.data)

          if(container==='cart'){
            handleCloseModal()
            getCartApiCall(`cart/getCartById`)
            .then((result)=>{
              const {data}=result;
              campairData(data.data.books)
            })
            .catch((error)=>{
               console.log(error)
            })
          }
          else{
            navigate("books")
          }
        }
        else if(data.message==="User is not registered !"){
          setOpen(!open)
          setMessage("User is not registered !")
        }
        else if(data.message==="User Password Is Wrong !"){
          setOpen(!open)
          setMessage("User Password Is Wrong !")
        }
        else{
          setOpen(!open)
          setMessage("User not Login")
        }
        
     })
     .catch((error)=>{
         console.log(error)
         setOpen(!open)
         setMessage("User not Login deu to backend")
     })

      }
      else{
        if(!lastName) {
          setOpen(!open)
          setMessage("lastName is required !")
          return
         }
         if(!firstName){
          setOpen(!open)
          setMessage("firstName is required !")
          return
         }
        if(!email) {
          setOpen(!open)
          setMessage("Email is requred!")
          return
         }
         if(!password){
          setOpen(!open)
          setMessage("Password is required !")
          return
         }
       
        signupApiCall(`users/signup`,{lastName,firstName,email,password})
        .then((result)=>{
            const {data}=result
            console.log(data);
            handleCloseModal()
        })
        .catch((error)=>{
           console.log(error)
        })

      }
 

 
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);

    };



  return (
    <>
    { container!=='cart' ?
     <div className='login-singup-main-container-cnt'>
     <div className='login-main-container-cnt'>
     <div className='login-left-container-cnt' >
           <div> 
              <img className='img-cnt' src={logo} alt="img is loading" />
           </div>
           <div>
             <span className='left-heading-cnt' > Online Book Shopping</span>
           </div>
       </div>
       <div  className='login-container-cnt'>
          <div className='login-heading-cnt' >
           <div className='login-heading-contidion-cnt' > 
           <span className='login-text-heading-cnt'  style={{ color: condition === 'login' ? 'black' : 'grey' }} onClick={()=>{conditionChange('login')}}>Login</span>
           {condition === 'login' ? <span className='login-line-cnt' ></span> : <></> } 
           </div>
           <div className='login-heading-contidion-cnt'  >
           <span className='login-text-heading-cnt' style={{ color: condition === 'signup' ? 'black' : 'grey' }} onClick={()=>{conditionChange('signup')}}>SignUp</span>
           {condition === 'signup' ? <span className='login-line-cnt' ></span> : <></> } 
           </div>
           </div>
           {condition==='login' ? <div >
           <div className='login-main-text-cnt' >
                 <div className='login-heding-text-cnt' > 
                     <span className='input-heading-cnt' >Email</span>
                     <input className='login-input-cnt' type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                 </div>
                 <div className='login-heding-text-cnt'>
                     <span className='input-heading-cnt' > Password </span>
                     <input className='login-input-cnt'  type="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                 </div>
           </div> 
           <div className='login-btn-main-cnt' >
               <button className='login-btn-cnt'  onClick={()=>{handleSubmit('login')}} > Login </button>
           </div>
           <div className='login-or-main-container-cnt' >
                    <span className='line-cnt' ></span>
                    <span className='or-cnt' >Or</span>
                    <span className='line-cnt'></span>
           </div>
           <div className='login-btn-main-container-cnt' >
           <button className='login-btn-cnt-2'   > FACEBOOK </button>
           <button className='login-btn-cnt-3'   > GOOGLE </button>
           </div>
           </div>
           :  <div>
           <div className='login-main-text-cnt' >
                 <div className='login-heding-text-cnt' > 
                     <span className='input-heading-cnt' >First Name</span>
                     <input className='login-input-cnt' type="text" onChange={(e)=>{setFirstName(e.target.value)}} />
                 </div>
                 <div className='login-heding-text-cnt'>
                     <span className='input-heading-cnt' >Last Name </span>
                     <input className='login-input-cnt'  type="text" onChange={(e)=>{setLastName(e.target.value)}}/>
                 </div>
                 <div className='login-heding-text-cnt' > 
                     <span className='input-heading-cnt' >Email</span>
                     <input className='login-input-cnt' type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                 </div>
                 <div className='login-heding-text-cnt'>
                     <span className='input-heading-cnt' > Password </span>
                     <input className='login-input-cnt'  type="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                 </div>
                
           </div> 
           <div className='login-btn-main-cnt' >
               <button className='login-btn-cnt'  onClick={()=>{handleSubmit('signup')}} > Signup </button>
           </div>

           </div> }
           
          
      
        </div> 

     </div>
   </div> : 
   
   <div className='cart-login-container-cnt'>
        <div className='login-main-container-cnt'>
    <div className='login-left-container-cnt' >
          <div> 
             <img className='img-cnt' src={logo} alt="img is loading" />
          </div>
          <div>
            <span className='left-heading-cnt' > Online Book Shopping</span>
          </div>
      </div>
      <div  className='login-container-cnt'>
         <div className='login-heading-cnt' >
          <div className='login-heading-contidion-cnt' > 
          <span className='login-text-heading-cnt'  style={{ color: condition === 'login' ? 'black' : 'grey' }} onClick={()=>{conditionChange('login')}}>Login</span>
          {condition === 'login' ? <span className='login-line-cnt' ></span> : <></> } 
          </div>
          <div className='login-heading-contidion-cnt'  >
          <span className='login-text-heading-cnt' style={{ color: condition === 'signup' ? 'black' : 'grey' }} onClick={()=>{conditionChange('signup')}}>SignUp</span>
          {condition === 'signup' ? <span className='login-line-cnt' ></span> : <></> } 
          </div>
          </div>
          {condition==='login' ? <div >
          <div className='login-main-text-cnt' >
                <div className='login-heding-text-cnt' > 
                    <span className='input-heading-cnt' >Email</span>
                    <input className='login-input-cnt' type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className='login-heding-text-cnt'>
                    <span className='input-heading-cnt' > Password </span>
                    <input className='login-input-cnt'  type="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
          </div> 
          <div className='login-btn-main-cnt' >
              <button className='login-btn-cnt'  onClick={()=>{handleSubmit('login')}} > Login </button>
          </div>
          <div className='login-or-main-container-cnt' >
                   <span className='line-cnt' ></span>
                   <span className='or-cnt' >Or</span>
                   <span className='line-cnt'></span>
          </div>
          <div className='login-btn-main-container-cnt' >
          <button className='login-btn-cnt-2'   > FACEBOOK </button>
          <button className='login-btn-cnt-3'   > GOOGLE </button>
          </div>
          </div>
          :  <div>
          <div className='login-main-text-cnt' >
                <div className='login-heding-text-cnt' > 
                    <span className='input-heading-cnt' >First Name</span>
                    <input className='login-input-cnt' type="text" onChange={(e)=>{setFirstName(e.target.value)}} />
                </div>
                <div className='login-heding-text-cnt'>
                    <span className='input-heading-cnt' >Last Name </span>
                    <input className='login-input-cnt'  type="text" onChange={(e)=>{setLastName(e.target.value)}}/>
                </div>
                <div className='login-heding-text-cnt' > 
                    <span className='input-heading-cnt' >Email</span>
                    <input className='login-input-cnt' type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className='login-heding-text-cnt'>
                    <span className='input-heading-cnt' > Password </span>
                    <input className='login-input-cnt'  type="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
               
          </div> 
          <div className='login-btn-main-cnt' >
              <button className='login-btn-cnt'  onClick={()=>{handleSubmit('signup')}} > Signup </button>
          </div>
          <Snackbar
       open={open}
       autoHideDuration={6000}
       onClose={handleClose}
       message={message}
       
     />

          </div> }
          
         
     
       </div> 

         </div>
   </div>

 
     }
      <Snackbar
       open={open}
       autoHideDuration={6000}
       onClose={handleClose}
       message={message}
       
     />
    
    </>
     
  )
}
