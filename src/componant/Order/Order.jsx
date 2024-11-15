import React, { useEffect, useState } from 'react'
import './Order.scss'
import { getOrderApiCall } from '../../utils/Api';

export default function Order() {
  const [order,setOder]=useState();

  useEffect(()=>{
    getOrderApiCall('order/getOrder')
    .then((result)=>{
      const {data}=result
      setOder(data.data)
    })
    .catch((error)=>{
       console.log(error)
    })
  },[])

  

  return (
    <div className='order-main-contaner-cnt' >
        <div className='order-main-img-contaner-cnt' > 
            <img src="https://cdn-icons-png.flaticon.com/256/6225/6225308.png" alt="img does not load " />
         </div>
         <div className='order-main-text-contaner-cnt' >
           <h1> Order placed successfully </h1>
         </div>
         <div className='order-main-normal-text-contaner-cnt' > 
          <span> hurray!!! your order is confirmed the order id is #123456 save the order id for further communication.... </span>
         </div>

         <div className='order-bottom-main-cnt' >

            <div className='order-text-cnt' >
                <span className='order-table-heading'>Name</span>
                <span className='order-table-text'>{order?.shippingAddress?.name}</span>
            </div>

            <div className='order-text-cnt' >
                <span className='order-table-heading' >Contact us</span>
                <span className='order-table-text' >{order?.shippingAddress?.mobileNumber}</span>
            </div>

            <div className='order-text-cnt' >
                <span className='order-table-heading' > Address  </span>
                <span className='order-table-text' >{order?.shippingAddress?.address}</span>
            </div>

         </div>

         <div className='order-main-btn-cnt' >
               <button className='cart-oder-btn-cnt'> Continue shopping</button>
        </div>
            

    </div>
  )
}
