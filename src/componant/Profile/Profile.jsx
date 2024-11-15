import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { getUserApiCall, updateUserApiCall } from '../../utils/Api'

function Profile() {
    const [condition,setCondition] = useState(false)
    const [editCondition,setEditCondition] = useState(true)
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
  

    useEffect(()=>{
     getUserApiCall(`users/getUser`)
     .then((result)=>{
       const {data}=result;
       console.log(data.data)
       setFirstName(data?.data?.firstName)
       setLastName(data?.data?.lastName)
       setEmail(data.data.email)
     })
     .catch((error)=>{
        console.log(error)
     })
     
    },[])

    const UpdateApi= (action)=>{
     updateUserApiCall(`users/updateUser`,{firstName,lastName,email})
     .then((result)=>{
        console.log(result)
        setEditCondition(!editCondition)
     })
     .catch((error)=>{
        console.log(error)
     })
    }

  return (
    <div className='profile-main-container-cnt'> 
      <div className='profile-main-heading-cnt'> <span className='home-heading-cnt'> Home /</span> <span className='profile-heading-cnt'>profile</span></div>
      <div className='profile-container-cnt'>
        <div className='profile-persoanl-details-container' >
            <div className='personal-details-cnt' > 
            <span className='personal-heading-cnt'>Personal Details</span>
            {editCondition ?    <span className='edit-heading-cnt' onClick={()=>{setEditCondition(!editCondition)}} >Edit</span>  
            : <span className='edit-heading-cnt' onClick={()=>{setEditCondition(!editCondition)}}  > Cancel </span>   }
            { !editCondition && <button className='save-btn-cnt'  onClick={()=>{UpdateApi("update")}} > Save </button>}
          
            </div>
            <div className='imput-main-container'> 
                 <span className='input-lable-cnt'>First Name </span>
                 <input className='input-fileds-cnt' style={{backgroundColor: editCondition ? "rgb(233, 225, 225)"  : "#ffffff" }} type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} /> 
            </div>
            <div className='imput-main-container'> 
                 <span className='input-lable-cnt'> Last Name</span>
                 <input className='input-fileds-cnt' type="text" style={{backgroundColor: editCondition ? "rgb(233, 225, 225)"  : "#ffffff" }}  value={lastName} onChange={(e)=>{setLastName(e.target.value)}} /> 
            </div>

            <div className='imput-main-container'> 
                 <span className='input-lable-cnt'> Email Id </span>
                 <input className='input-fileds-cnt' type="text" style={{backgroundColor: editCondition ? "rgb(233, 225, 225)"  : "#ffffff" }}  value={email} onChange={(e)=>{setEmail(e.target.value)}}  /> 
            </div>
            <div className='imput-main-container'> 
                 <span className='input-lable-cnt'> Password </span>
                 <input className='input-fileds-cnt' style={{backgroundColor: editCondition ? "rgb(233, 225, 225)"  : "#ffffff" }}  type="password"  value={'aksandn'} /> 
            </div>

         </div>
          <div className='profile-address-main-container-cnt'>
            <div className='address-main-heading-cnt'> 
                <span className='address-heading-cnt'> Address Details </span>
                <span className='add-heading-cnt'> Add New Address </span>
           </div>
           <div className='address-cantainer-cnt' >
           <div className='personal-details-cnt' > 
            <span className='personal-heading-cnt'>1.Work</span>
            <span className='edit-heading-cnt' onClick={()=>{setCondition(!condition)}} >Edit</span>  
            </div>
            <div className='imput-main-container'> 
                 <span className='input-lable-cnt'> Address </span>
               
                 {condition ?  <textarea rows={4} className='input-fileds-cnt' type="textarea"  placeholder='At post jambada sub district amla district' /> 
                  :  <span  className='input-dis-cnt' > At post jambada sub district amla district </span> }
        
                 <div className='address-city-container-cnt'>
                 <div className='imput-second-main-container'> 
                 <span className='input-lable-cnt'> city / town </span>
                 {condition ?       <input className='input-fileds-cnt' type="text"  placeholder='Amla' /> 
                 :  <span  className='input-dis-cnt' > Amla </span> }
           
                
                </div>
                 <div className='imput-second-main-container'> 
                 <span className='input-lable-cnt'> state</span>
                 {condition ?  <input className='input-fileds-cnt' type="text"  placeholder='Karnataka' /> 
                 :     <span  className='input-dis-cnt' > Karnataka </span> }
                
             
                </div>
                 </div>
            </div>
           </div>

        </div>

      </div>
    </div>
  )
}

export default Profile