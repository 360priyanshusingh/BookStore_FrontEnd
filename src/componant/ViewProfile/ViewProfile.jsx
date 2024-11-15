import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./ViewProfile.scss"
import Login from '../Login/Login';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
function ViewProfile(props) {
    const [open,setOpen]=useState(false)
    const navigate=useNavigate()
    const {toggleFuction, user}=props

    const naviagateFuction=(action)=>{
        if(action==='whilist'){
            navigate("wishList")
        }
        else if(action==="order"){
            navigate("order")
        }
        else if(action==="profile"){
            navigate("profile")
        }
        
        toggleFuction()
    }

    const handleClose=()=>{
        setOpen(!open)
    }

    const logoutFuction=()=>{

        localStorage.removeItem('token')
        toggleFuction()
    }

  return (
    <div className='viewprofile-main-container-cnt' >
        
        {!user?    <div className='viewprofile-container-cnt' >
             <div> <span className='viewprofile-welcome-heading-cnt' >Welcome</span>  </div>
             <div> <span className='viewprofile-text-heading-cnt' >To acsess account and manage orders </span> </div>
             <div className='viewprofile-login-area-cnt'> <span className='viewprofile-login-btn-cnt' onClick={()=>setOpen(!open)} >LOGIN/SINUP</span> </div>
             <span className='viewprofile-line-container-cnt' ></span>
             <div className='viewprofile-wishlist-container-cnt' onClick={()=>{naviagateFuction("order")}} > 
              <ShopOutlinedIcon className='viewprofile-wishlist-icon-heading-cnt' />  
              <span className='viewprofile-wishlist-heading-cnt' > My Order </span>
             
             </div>
             <div className='viewprofile-wishlist-container-cnt' onClick={()=>{naviagateFuction("whilist")}} > 
              <FavoriteBorderIcon className='viewprofile-wishlist-icon-heading-cnt' />  
              <span className='viewprofile-wishlist-heading-cnt' >  Wishlist </span>
             
             </div>
        </div>   : 

     <div className='viewprofile-container-cnt' >
<div> <span className='viewprofile-welcome-heading-cnt' >Welcome {user.firstName}</span>  </div>
{/* <div> <span className='viewprofile-text-heading-cnt' >To acsess account and manage orders </span> </div> */}
{/* <span className='viewprofile-line-container-cnt' ></span> */}
<div className='viewprofile-wishlist-container-cnt' onClick={()=>{naviagateFuction("profile")}} > 
 <AccountCircleOutlinedIcon className='viewprofile-wishlist-icon-heading-cnt' />  
 <span className='viewprofile-wishlist-heading-cnt' > Profile </span>

</div>
<div className='viewprofile-wishlist-container-cnt' onClick={()=>{naviagateFuction("order")}} > 
 <ShopOutlinedIcon className='viewprofile-wishlist-icon-heading-cnt' />  
 <span className='viewprofile-wishlist-heading-cnt' > My Order </span>

</div>
<div className='viewprofile-wishlist-container-cnt' onClick={()=>{naviagateFuction("whilist")}} > 
 <FavoriteBorderIcon className='viewprofile-wishlist-icon-heading-cnt' />  
 <span className='viewprofile-wishlist-heading-cnt' >  Wishlist </span>

</div>
<div className='viewprofile-login-area-cnt'> <span className='viewprofile-login-btn-cnt' onClick={()=>logoutFuction()} > LOGOUT </span> </div>

    </div>
        
        }
       

       

        <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"> 
            <Login container={'cart'} handleCloseModal={handleClose} />
           </Modal>

        
    </div>
  )
}

export default ViewProfile;