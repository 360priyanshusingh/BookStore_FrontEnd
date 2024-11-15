import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./componant/DashBoard/DashBoard";
import BookContainer from "./componant/BookContainer/BookContainer";
import BookDetails from "./componant/BookDetails/BookDetails.jsx";

import Login from "./componant/Login/Login.jsx";
import Cart from "./componant/Cart/Cart.jsx";
import Order from "./componant/Order/Order.jsx";
import MyOrder from "./componant/MyOrder/MyOrder.jsx";
import WishList from "./componant/WishList/WishList.jsx";
import Profile from "./componant/Profile/Profile.jsx";

export default function RoutingModule() {
    const appRoutes = createBrowserRouter([
            {
                path:"",
                element:<Login/>
            },
            {
               path:"",
               element:<DashBoard/>,
               children:[
                {
                    path:"books",
                    element:<BookContainer/>
                },
                {
                    path:"bookDetails/:bookId",
                    element:<BookDetails/>
                },
                {
                    path:"cart",
                    element:<Cart/>
                },
                {
                    path:"order",
                    element:<Order/>
                },
                {
                    path:"myOrder",
                    element:<MyOrder/>
                },
                {
                    path:"wishlist",
                    element:<WishList/>
                },
                {
                    path:"profile",
                    element:<Profile/>
                }

                ]

            }
            
        
    ])

    return(
        <RouterProvider router={appRoutes}/>
    )
}